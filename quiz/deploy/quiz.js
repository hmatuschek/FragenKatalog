var bookLinkTable = {
  "E": "https://www.darc.de/der-club/referate/ajw/lehrgang-te",
  "A": "https://www.darc.de/der-club/referate/ajw/lehrgang-ta",
  "BV": "https://www.darc.de/der-club/referate/ajw/lehrgang-bv",
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function lbinomial(n, k) {
    if (k < 0 || k > n) return undefined;
    var coeff = 0;
    for (var i = 0; i<k; i++) {
        coeff += Math.log(n - i) - Math.log(i + 1);
    }
    return coeff;
}

function cpbinom(k, n, p) {
  if (0 >= k) return 1.0;
  var val = 0.0;
  for (var i=k;i<=n;i++) {
    val += Math.exp(lbinomial(n,i) + Math.log(p)*i + Math.log(1-p)*(n-i));
  }
  return val;
}

class Quiz {
  constructor(vnode) {
    var updateConfig = false;
    var settings = JSON.parse(window.localStorage.getItem(window.localStorage.getItem("book")))
    if (! ("weights" in settings)) { settings["weights"]={}; updateConfig=true; }
    if (! ("answered" in settings)) { settings["answered"]=0; updateConfig=true; }
    if (! ("correct" in settings)) { settings["correct"]=0; updateConfig=true; }
    if (updateConfig) {
      window.localStorage.setItem(window.localStorage.getItem("book"), JSON.stringify(settings));
    }
    this.booklink = bookLinkTable[window.localStorage.getItem("book")]
    this.allweights = settings.weights
    this.weights = {};
    this.questions = {};
    this.current = null;
    this.validated = false;
    this.selected = null;
    this.answered = settings.answered;
    this.correct = settings.correct;
    this.probability = cpbinom(25, 34, (this.correct+1.0)/(this.answered+4.0));
    this.loadQuestions(settings.chapters);
  }

  loadQuestions(chapters) {
    // Load every enabled chapter
    var todo = chapters.length
    console.log("Load "+todo+" chapters "+chapters);
    chapters.forEach((ch, i) => {
      m.request({
        method:"GET",
        url: ch + ".json"
      }).then((result) => {
        // Add questions and update weighting of questions s
        result.forEach((q, i) => {
          q["link"] = this.booklink+"/" + ch.toLowerCase() + "/";
          this.questions[q.id] = q;

          if (! (q.id in this.allweights)) {
            this.allweights[q.id] = 1.0;
          }
          this.weights[q.id] = this.allweights[q.id];
        })
        if (0 == --todo) {
          this.next();
          this.save();
        }
      }).catch((err) => {
        console.log("oops: "+err);
        if (0 == --todo) {
          this.next();
          this.save();
        }
      })
    });
  }

  save() {
    var settings = JSON.parse(window.localStorage.getItem(window.localStorage.getItem("book")));
    Object.keys(this.weights).forEach((k, i) => {settings.weights[k] = this.weights[k];});
    settings.correct = this.correct;
    settings.answered = this.answered;
    window.localStorage.setItem(window.localStorage.getItem("book"), JSON.stringify(settings));
  }

  pick() {
    var keys = Object.keys(this.weights);
    var csum = [this.weights[keys[0]]];
    for (var i=1; i<keys.length; i++) {
      csum.push(csum[csum.length-1]+this.weights[keys[i]])
    }
    for (var i=0; i<keys.length; i++) {
      csum[i] /= csum[csum.length-1];
    }
    var x = Math.random();
    for (var idx=0; idx<keys.length; idx++) {
      if (csum[idx]>=x)
        return this.questions[keys[idx]]
    }
    return this.questions[keys[keys.length-1]];
  }

  next() {
    var q = this.pick();
    if (q) q.answer = shuffle(q.answer);
    this.current = q;
    this.validated = false;
    this.selected = null;
  }

  check(question, answer) {
    this.validated = true;
    this.selected = answer;
    this.answered += 1;
    if ((undefined != answer) && this.current.answer[answer].correct) {
      this.correct += 1;
      this.next();
      this.weights[question] /= 2;
    }  else {
      this.weights[question] *= 5;
    }
    var pc = (this.correct+1.0)/(this.answered+4.0)
    this.probability = cpbinom(25, 34, pc);
    console.log("PC="+pc+", Prb="+this.probability);
    this.save();
  }

  onsubmit(e) {
    e.preventDefault();
    for (var i=0; i<4; i++) {
      if (e.target[i].checked) {
        this.check(this.current.id, i);
        return;
      }
    }
    this.check(this.current.id, undefined);
  }

  view() {
    if (this.current) {
      var answ = [m("tr.question", [m("th.qname", m("a.qname", {href:this.current.link}, this.current.name)), m("th.qtext",m.trust(this.current.text))])];
      for (var i=0; i<this.current.answer.length; i++) {
        var a = this.current.answer[i];
        var style = {};
        if (this.validated && a.correct) {
          style["background-color"] = "green";
        } else if (this.validated && (i == this.selected)) {
          style["background-color"] = "red";
        }
        answ.push(m("tr", {style: style}, [
          m("td.input", m("input",{type:"radio", name:"answ", checked:(i == this.selected), value:a.correct})),
          m("td.answer", m.trust(a.text))
        ]));
      }
      answ.push(m("tr.buttons", [
        m("td.submit", m("button.button[type=submit]", {disabled:this.validated}, "Prüfen")),
        m("td.skip", m("button.button[type=button]", {disabled:false, onclick:(e) => { this.next(); }}, "Nächste"))
      ]));
      return [
        m("nav", [
          m(m.route.Link, {href:"/"}, "Buch"), m("span.sep", ">"),
          m(m.route.Link, {href:"/chapters"}, window.localStorage.getItem("book")), , m("span.sep", ">"),
          m(m.route.Link, {href:"/quiz"}, "Quiz")]),
        m("form", {onsubmit: (e) => {this.onsubmit(e);}}, [
          m("table.question", {width:"100%"}, answ),
        ]),
        m("div.stats", [
          m("span.statstitle", "Statistik:"),
          m("span.correct",["Korrekt: ", this.correct]),
          m("span.answered", ["Beantwortet: ", this.answered]),
          m("span.questions", ["Fragen: ", Object.keys(this.questions).length]),
          m("div.prob", [
            m("span.prob","Bestehensw'keit: "),
            m("progress.prob", {max:100, value:100*this.probability}, Math.round(100*this.probability)+"%"),
          ]),
        ])
      ];
    } else {
      return m("div.loading", "Loading quiz...");
    }
  }
}
