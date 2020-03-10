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

  view() {
    var chs = [];
    ChTable[this.book].forEach((ch, i) => {
      chs.push(m("li", [
        m("label", ch),
        m("input[type=checkbox]", {
          value:ch,
          onchange:(e)=>{ this.setChapter(e) },
          checked: this.settings.chapters.has(ch)
        })
      ]));
    });
    return [
      m("div", m("button[type=button]",{onclick: (e)=> { m.route.set("/quiz"); }}, "Start")),
      m("div", [
        m("button[type=button]",{onclick: (e)=> { }}, "Alle auswählen"),
        m("button[type=button]",{onclick: (e)=> { }}, "Keine auswählen")
      ]),
      m("ul",chs)];
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
    return m("ul", [
      m("li", m("button[type=button]", {onclick: (e)=>{this.setBook("E")}}, "Technik E")),
      m("li", m("button[type=button]", {onclick: (e)=>{this.setBook("A")}}, "Technik A")),
      m("li", m("button[type=button]", {onclick: (e)=>{this.setBook("BV")}}, "Vorschriften/Betriebstechnik"))
    ]);
  }
}
