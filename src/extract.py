#!/usr/bin/env python3

import xml.etree.ElementTree as ET
from os.path import join, dirname, exists, abspath, relpath
from os import symlink, makedirs
from base64 import b64decode

path = abspath(dirname(__name__))
root = ET.parse("../fragen.in.xml").getroot();

for img in root.findall("./pool/img"):
    fn = join(path, "pool", "img", img.attrib["id"]+"."+img.attrib["type"])
    if exists(fn):
        print("Warning overriding image {0}".format(fn))
    f = open(fn, "wb")
    f.write(b64decode(img.text[2:-1]));
    f.close();

for q in root.findall("./pool/question"):
    fn = join(path, "pool", "q", q.attrib["id"]+".xml");
    if exists(fn):
        print("Warning overriding question {0}".format(fn))
    ET.ElementTree(q).write(fn, encoding="utf-8", xml_declaration=True)

for cat in root.findall("./catalog/catalog"):
    ET.ElementTree(cat).write(join(path,"catalog",cat.get("id")+".xml"), encoding="utf-8", xml_declaration=True)
