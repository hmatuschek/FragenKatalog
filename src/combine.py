#!/usr/bin/env python3

import xml.etree.ElementTree as ET
from os.path import join, basename, abspath, dirname, islink, isdir
from os import listdir
from glob import glob
from base64 import b64encode
from sys import argv, exit

if len(argv) < 2:
    print("USAGE combine.py OUTPUT.xml")
    sys.exit(-1)

path = abspath(dirname(__file__))
root = ET.Element("AfuP");
pool = ET.SubElement(root, "pool")

print ("Exec combine in {0}".format(path))

for img in glob(join(path, "pool", "img", "*.*")):
    fname = basename(img)
    el = ET.SubElement(pool, "img")
    el.set("id",fname.split(".")[0])
    el.set("type", fname.split(".")[1])
    data = open(img, "rb").read();
    el.text = str(b64encode(data));

for q in glob(join(path, "pool", "q", "*.xml")):
    el = ET.parse(q).getroot()
    pool.append(el)

def recGenCat(parent, p):
    name = basename(p);
    cat = ET.SubElement(parent, "catalog")
    cat.set("id", name)
    # process questions
    for e in listdir(p):
        if islink(join(p,e)):
            el = ET.SubElement(cat, "q");
            el.set("ref", basename(e).split(".")[0])
        if isdir(join(p,e)):
            recGenCat(cat, join(p, e))
recGenCat(root, join(path,"catalog"))

ET.ElementTree(root).write(argv[1], encoding="utf-8", xml_declaration=True)
