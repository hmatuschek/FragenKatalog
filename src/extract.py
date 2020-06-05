#!/usr/bin/env python3

import xml.etree.ElementTree as ET
from os.path import join, dirname, exists, abspath, relpath
from os import symlink, makedirs
from base64 import b64decode

path = abspath(dirname(__name__))
root = ET.parse("../fragen.in.xml").getroot();

for img in root.findall("./pool/img"):
    f = open(join(path, "pool", "img", img.attrib["id"]+"."+img.attrib["type"]), "wb")
    f.write(b64decode(img.text));
    f.close();

for q in root.findall("./pool/question"):
    fn = join(path, "pool", "q", q.attrib["id"]+".xml");
    ET.ElementTree(q).write(fn, encoding="utf-8", xml_declaration=True)

def recCatWalker(cat, p):
    np = join(p, cat.attrib["id"])
    makedirs(np, exist_ok=True)
    for q in cat.findall("q"):
        src = relpath(join(path, "pool", "q", q.attrib["ref"]+".xml"), np)
        dest = join(np, q.attrib["ref"]+".xml")
        if not exists(dest):
            symlink(src, dest)
    for c in cat.findall("catalog"):
        recCatWalker(c, np)

for cat in root.findall("./catalog"):
    recCatWalker(cat, join(path,"catalog"))
