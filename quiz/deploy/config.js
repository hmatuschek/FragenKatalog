var bookLinkTable = {
  "E": "https://www.darc.de/der-club/referate/ajw/lehrgang-te",
  "A": "https://www.darc.de/der-club/referate/ajw/lehrgang-ta",
  "BV": "https://www.darc.de/der-club/referate/ajw/lehrgang-bv",
}

var ChTable = {
  "E": new Set([
    "E01","E02","E03","E04","E05","E06","E07","E08","E09","E10","E11","E12","E13","E14","E15",
    "E16","E17","E18"
  ]),
  "A": new Set([
    "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13",
    "A14", "A15", "A16", "A17", "A18", "A19"
  ]),
  "BV": new Set([
    "BV01", "BV02", "BV03", "BV04", "BV05", "BV06", "BV07", "BV08", "BV09", "BV10", "BV11", "BV12",
    "BV13", "BV14"
  ])
};

function toSet(a) {

}
class ChapterSelect {
  constructor(vnode) {
    this.book = window.localStorage.getItem("book")
    this.booklink = bookLinkTable[this.book];
    if (null == window.localStorage.getItem(this.book)) {
      this.settings = { chapters: ChTable[this.book] };
      var settings = this.settings;
      settings.chapters = Array.from(settings.chapters);
      window.localStorage.setItem(this.book, JSON.stringify(settings));
    }
    this.settings = JSON.parse(window.localStorage.getItem(this.book));
    this.settings.chapters = new Set(this.settings.chapters);
  }

  setChapter(e) {
    if (e.target.checked) {
      this.settings.chapters.add(e.target.value);
    } else {
      this.settings.chapters.delete(e.target.value)
      console.log(this.settings.chapters)
    }
    var settings = JSON.parse(window.localStorage.getItem(this.book));
    settings.chapters = Array.from(this.settings.chapters);
    window.localStorage.setItem(this.book, JSON.stringify(settings));
  }

  selectAll() {
    this.settings.chapters = ChTable[this.book];
    var settings = JSON.parse(window.localStorage.getItem(this.book));
    settings.chapters = Array.from(this.settings.chapters);
    window.localStorage.setItem(this.book, JSON.stringify(settings));
  }

  selectNone() {
    this.settings.chapters = new Set();
    var settings = JSON.parse(window.localStorage.getItem(this.book));
    settings.chapters = Array.from(this.settings.chapters);
    window.localStorage.setItem(this.book, JSON.stringify(settings));
  }

  view() {
    var chs = [];
    ChTable[this.book].forEach((ch, i) => {
      chs.push(m("li", [
        m("input[type=checkbox]", {
          value:ch,
          onchange:(e)=>{ this.setChapter(e) },
          checked: this.settings.chapters.has(ch)
        }),
        m("label", [
          m("span", "Kapitel "),
          m("a.qname", {target: "_blank", href:this.booklink+"/"+ch.toLowerCase()}, ch)
        ])
      ]));
    });
    return [
      m("nav.chap", [
        m(m.route.Link, {href:"/"}, "Buch"), m("span.sep", ">"),
        m(m.route.Link, {href:"/chapters"}, window.localStorage.getItem("book"))
      ]),
      m("main.chap", [
        m("div.chapsel", [
          m("button[type=button]",{onclick: (e)=> { this.selectAll(); }}, "Alle auswählen"),
          m("button[type=button]",{onclick: (e)=> { this.selectNone(); }}, "Keine auswählen")
        ]),
        m("ul.chap",chs),
        m("div.start", m("button[type=button]",{onclick: (e)=> { m.route.set("/quiz"); }}, "Start"))
      ]),
      m("footer.chap", [
        "Wählen Sie hier die Kapitel aus, die Sie üben möchten. Das heißt jende Kapitel dieses ",
        "Buches, die Sie schon bearbeitet haben."
      ])
    ];
  }
}

class BookSelect {
  constructor(vnode) {
    if (null == window.localStorage.getItem("book")) {
      window.localStorage.setItem("book", "E");
    }
    this.book = window.localStorage.getItem("book")
  }

  setBook(book) {
    this.book = book;
    window.localStorage.setItem("book", this.book);
    m.route.set("/chapters")
  }

  view() {
    return [
      m("header","Amateurfunk Quiz"),
      m("main.book", [
        m("p.book", "Wählen Sie das Buch, dessen Inhalt Sie üben wollen:"),
        m("ul.book", [
          m("li.book", m("button[type=button]", {onclick: (e)=>{this.setBook("E")}}, "Technik E")),
          m("li.book", m("button[type=button]", {onclick: (e)=>{this.setBook("A")}}, "Technik A")),
          m("li.book", m("button[type=button]", {onclick: (e)=>{this.setBook("BV")}}, "Vorschriften/Betriebstechnik"))
        ])
      ]),
      m("footer.book", [
        "Das Quiz ist nach den Büchern von Moltrecht organisiert. Es soll Ihnen als Lernhilfe ",
        "dienen. Für jedes Buch können Sie die Kapitel wählen, die Sie schon bearbeitet haben."
      ])
    ];
  }
}
