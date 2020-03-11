# Afu Fragenkatalog der Bundesnetzagentur

Dies ist ein weiterer Versuch den Fragenkatalog zur Amateurfunkprüfung der Bundesnetzagentur in
einem maschinenlesbaren Format zu exportieren. Der gesammte Fragenkatalog inklusive aller Bilder
befindet sich in der **fragen.xml** Datei und steht unter der CC-BY-NC Lizenz.

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
Eine Frage benötigt wie die Bilder auch, eine eindeutige ID. Zusätlich kann ein lesbarer Name
angegeben werden. Eine Frage besteht dann aus einem Fragentext, der auch ein optionales Bild
enthalten kann, sowie mehrerer Antworten, von der eine die korrekte Antwort sein muss.
```xml
<question id="ETG504" name="E/TG504">
  <text>
    <p>Welche Schaltung wäre zwischen Senderausgang und Antenne eingeschleift am besten zur Verringerung der Oberwellenausstrahlungen geeignet?</p>
  </text>
  <answer correct="yes"><img src="ETG504a"/></answer>
  <answer correct="no"><img src="ETG504b"/></answer>
  <answer correct="no"><img src="ETG504c"/></answer>
  <answer correct="no"><img src="ETG504d"/></answer>
</question>
```
