<<<<<<< HEAD
XSLT = xsltproc

all: quiz moodle
.PHONY: all
=======
.PHONY: quiz

fragen.in.xml:
	./src/combine.py fragen.in.xml

fragen.xml: fragen.in.xml
	xsltproc -o fragen.xml compact.xslt fragen.in.xml
>>>>>>> c76ec384ee2b10ca793e94f09f5532aec0984198

quiz: fragen.xml
	$(MAKE) -C quiz/
.PHONY: quiz

moodle: fragen.xml
	$(MAKE) -C moodle/
.PHONY: moodle

fragen.in.xml:
	./src/combine.py fragen.in.xml

fragen.xml: fragen.in.xml
	$(XSLT) -o fragen.xml compact.xslt fragen.in.xml

<<<<<<< HEAD
clean:
	rm -f fragen.xml
	$(MAKE) -C quiz clean
	$(MAKE) -C moodle clean
=======
moodle: fragen.xml
	make -C moodle/

all: quiz

clean:
	rm -f fragen.xml
	make -C quiz clean
	make -C moodle clean
>>>>>>> c76ec384ee2b10ca793e94f09f5532aec0984198
