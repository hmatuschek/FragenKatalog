fragen.in.xml:
	./src/combine.py fragen.in.xml

fragen.xml: fragen.in.xml
	xsltproc -o fragen.xml compact.xslt fragen.in.xml

quiz: fragen.xml
	make -C quiz/

all: quiz
