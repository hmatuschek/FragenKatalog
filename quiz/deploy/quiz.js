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

class ProgressBar {
  constructor(vnode, p) {
    this.progress = p;
  }

  view() {
    return m("progress", {id:"prob", max:100, value:Math.round(this.progress*100)}, Math.round(this.progress*100)+"%");
  }
}

class Quiz {
  constructor(vnode) {
    this.book = "E"
    var settings = {};
    if (null == window.localStorage.getItem(this.book)) {
      settings = { chapters: [
        "E01","E02","E03","E04","E05","E06","E07","E08","E09","E10","E11","E12","E13","E14","E15",
        "E16","E17","E18"], weights: {}, answered: 0, correct: 0 };
      window.localStorage.setItem(this.book, JSON.stringify(settings));
    } else {
      settings = JSON.parse(window.localStorage.getItem(this.book))
    }
    this.weights = settings.weights;
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
    var todo = chapters.length
    chapters.forEach((ch, i) => {
      m.request({
        method:"GET",
        url: ch + ".json"
      }).then((result) => {
        result.forEach((q, i) => {
          console.log("Add question " + q.id);
          this.questions[q.id] = q;
          if (! (q.id in this.weights)) {
            console.log("Add question " + q.id);
            this.weights[q.id] = 1.0;
          }
        })
        if (0 == --todo) {
          this.save();
          this.next();
        }
      }).catch((err) => {
        if (0 == --todo) {
          this.save();
          this.next();
        }
      })
    });
  }

  save() {
    var settings = JSON.parse(window.localStorage.getItem(this.book));
    settings.weights = this.weights;
    settings.correct = this.correct;
    settings.answered = this.answered;
    window.localStorage.setItem(this.book, JSON.stringify(settings));
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
      var answ = [m("tr", [m("th.qname", this.current.name), m("th.qtext",m.trust(this.current.text))])];
      for (var i=0; i<this.current.answer.length; i++) {
        var a = this.current.answer[i];
        var style = {};
        if (this.validated && a.correct) {
          style["background-color"] = "green";
        } else if (this.validated && (i == this.selected)) {
          style["background-color"] = "red";
        }
        answ.push(m("tr", {style: style}, [
          m("td", m("input",{type:"radio", name:"answ", checked:(i == this.selected), value:a.correct})),
          m("td", m.trust(a.text))
        ]));
      }
      return [
        m("form", {onsubmit: (e) => {this.onsubmit(e);}}, [
          m("table.question", answ),
          m("button.button[type=submit]", {disabled:this.validated}, "Prüfen"),
          m("button.button[type=button]", {disabled:false, onclick:(e) => { this.next(); }}, "Nächste")
        ]),
        m("div", [
          m("span.correct",["Korrekt: ", this.correct]),
          m("span.answered", ["Beantwortet: ", this.answered]),
          m("span.questions", ["Fragen: ", Object.keys(this.questions).length]),
          m("div.", [
            "Bestehensw'keit: ",
            m("progress", {id:"prob", max:100, value:100*this.probability}, Math.round(100*this.probability)+"%"),
          ]),
        ])
      ];
    } else {
      return m("div.loading", "Loading quiz...");
    }
  }
}
