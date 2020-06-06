.PHONY: quiz

fragen.in.xml:
	./src/combine.py fragen.in.xml

fragen.xml: fragen.in.xml
	xsltproc -o fragen.xml compact.xslt fragen.in.xml

quiz: fragen.xml
	make -C quiz/

moodle: fragen.xml
	make -C moodle/

all: quiz

clean:
	rm -f fragen.xml
	make -C quiz clean
	make -C moodle clean
