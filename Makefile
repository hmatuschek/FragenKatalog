XSLT = xsltproc

all: quiz moodle

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

clean:
	rm -f fragen.xml
	$(MAKE) -C quiz clean
	$(MAKE) -C moodle clean
