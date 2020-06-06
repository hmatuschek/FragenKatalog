# Afu Fragenkatalog der Bundesnetzagentur

Dies ist ein weiterer Versuch den Fragenkatalog zur Amateurfunkprüfung der Bundesnetzagentur in
einem maschinenlesbaren Format zu exportieren. Der gesamte Fragenkatalog inklusive aller Bilder
befindet sich in der **fragen.in.xml** Datei und steht unter der CC-BY-NC Lizenz.

Des weiteren werden XSLT-Templates für verschiedene Ausgabeformate angeboten.

  * HTML, unter `/html` finden Sie Beispieltemplates mit denen Sie den Fragenkatalog in HTML
  ausgeben können
  * JSON, unter `/json` finden Sie Templates, die den Fragenkatalog in JSON wandeln. Dies ist vor
  allem für JS Answendungen und den Datenbankimport interessant.
  * Moodle, unter `/moodle` finden Sie die Templates, die den Fragenkatalog in das Moodle-Quiz XML
  format übertragen. Damit lassen sich die Prüfungsfragen als Fragesammlung in Moodle importieren
  und nutzen. Dies ist vor allem für Hochschulamateurfunkkurse interessant.

## Deployment
Die Anwendungen sind alle statische HTML/JS Webseiten. Ein beherztes
```
make quiz
```
erstellt alle benötigten Daten. Sie finden diese unter `/quiz/deploy`. Zum erstellen der benötigten
Fragenkataloge ist `xsltproc` notwendig. Ein aktuelles Beispiel der fertigen Webseiten finden Sie
unter https://hmatuschek.github.io/FragenKatalog.

## XML Format
Das grundlegende XML Dateiformat ist
```xml
<?xml version="1.0" encoding="utf-8"?>
<AfuP>
  <pool>
    ...
  </pool>
  <catalog id="...">
  </catalog>
</AfuP>
```
Die Fragendatei besteht aus einem vollständigen Fragenpool, der in dem `pool`-Element
eingeschlossen ist sowie mindestens einem Fragenkatalog, der die Fragen im Fragenpool referenziert.

### Fragenpool
Der Fragenpool wird mit in einem `pool`-Element eingeschlossen und definiert alle Fragen und
Bilder, die im Fragenkatalog vorkommen können. Ein Bild, das später von Fragen referenziert werden
kann, wird mit dem `img` element definiert. Eine Frage wird mit dem `question`-Element definiert.

### Bilddefinition
Jedes Bild benötigt eine eindeutige ID, einen Typ und die Bildinformation. Zum Beispiel definiert
```xml
<img id="ETG504d" type="png">iVBORw...</img>
```
ein Bild mit der ID "ETG504d" (Bild "d", im Fragenkatalog E, Frage TG504). Der Bildtyp is "png" und
dessen Inhalt wird als Base64 kodierte Zeichenkette angegeben.

### Fragendefinition
Eine Frage benötigt wie die Bilder auch, eine eindeutige ID. Zusätzlich kann ein lesbarer Name
angegeben werden. Eine Frage besteht aus einem Fragentext, der auch ein optionales Bild
enthalten kann, sowie mehrerer Antworten, von der eine die korrekte Antwort sein muss.
```xml
<question id="ETG504" name="E/TG504">
  <text>
    <p>Welche Schaltung wäre zwischen Senderausgang und Antenne eingeschleift am besten zur
      Verringerung der Oberwellenausstrahlungen geeignet?</p>
  </text>
  <answer correct="yes"><img src="ETG504a"/></answer>
  <answer correct="no"><img src="ETG504b"/></answer>
  <answer correct="no"><img src="ETG504c"/></answer>
  <answer correct="no"><img src="ETG504d"/></answer>
</question>
```
Jedes `answer`-Element besitzt ein `correct` Attribut, das angibt ob diese Antwort die korrekte
ist. Der Inhalt dieses Elements ist der Antworttext mit ggf. eingebetteten Bildern.

### Katalogdefinition
Ein Katalog ist einfach eine Sammlung von Unterkatalogen und referenzierten Fragen. Zum Beispiel
definiert
```xml
<catalog id="E">
  <catalog id="A">
    <q ref="TA101"/>
    <q ref="TA102"/>
    ...
  </catalog>
  ...
</catalog>
```
Den Katalog `E` (Technik Klasse E) mit dem Unterkatalog `A` (Kapitel A im Fragenkatalog der BNetzA)
der die Fragen `TA101`, `TA102`, etc. enthält.

In der `fragen.in.xml` Datei sind Mehrere Kataloge definiert. Zum einen die vier Fragenkataloge der
BNetzA: Technik E (`E`), Technik A (`A`), Betriebstechnik (`B`) und Vorschriften (`V`). Zum Anderen
ist ein Katalog `moltrecht` definiert, der alle Prüfungsfragen nach den entsprechenden Kapiteln in
den drei Moltrecht Büchern sortiert. Zum Beispiel enthält der Katalog `/motrecht/E/E01` alle Fragen
zum ersten Kapitel aus dem Lehrgang zur Technik der Klasse E.

Alle Kataloge (auch Unterkataloge) können einen optionalen Namen (`name` Attribut) und eine
optionale Beschreibung (`description`) erhalten.
