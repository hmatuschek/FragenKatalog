#!/usr/bin/env python3

import xml.etree.ElementTree as ET
from os.path import join, basename, abspath, dirname, islink, isdir
from os import listdir
from glob import glob
from base64 import b64encode
from sys import exit


images    = set();
questions = set();
refimgs   = set();

path = abspath(dirname(__name__))

for img in glob(join(path, "pool", "img", "*.*")):
    images.add(basename(img).split(".")[0])

for q in glob(join(path, "pool", "q", "*.xml")):
    root = ET.parse(q).getroot();
    questions.add(root.get("id"))
    for img in root.iter("img"):
        refimgs.add(img.get("src"))

missing_imgs = refimgs - images
unref_imgs   = images - refimgs

print("Found {0} images and {1} questions.".format(len(images),len(questions)))

if len(missing_imgs):
    for img in missing_imgs:
        print("Missing image {0}".format(img))
    print("{0}% images missing.".format(int(100.*len(missing_imgs)/len(refimgs))))
    exit(-1)

if len(unref_imgs):
    for img in unref_imgs:
        print("Unused image {0}".format(img))
    print("{0}% images unused.".format(int(100.*len(unref_imgs)/len(images))))
    exit(-1)

for cat in glob(join(path, "catalog", "*.xml")):
    refqs = set()
    root = ET.parse(cat).getroot();
    for q in root.iter("q"):
        refqs.add(q.get("ref"))
    missing_qs   = refqs - questions
    unref_qs     = questions - refqs
    if len(missing_qs):
        for q in missing_qs:
            print("Missing question {0} in {1}".format(q, root.get("id")))
        exit(-1)
    if len(unref_qs):
        for q in unref_qs:
            print("Unused question {0} in {1}".format(q, root.get("id")))
        exit(-1)

print("ok.")
