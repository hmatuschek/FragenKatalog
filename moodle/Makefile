all: genA genE genBV

clean:
	rm -f *.xml

genE: E01.xml E02.xml E03.xml E04.xml E05.xml E06.xml E07.xml E08.xml E09.xml \
	E10.xml E11.xml E12.xml E13.xml E14.xml E15.xml E16.xml E17.xml E18.xml

genA: A01.xml A02.xml A03.xml A04.xml A05.xml A06.xml A07.xml A08.xml A09.xml \
	A10.xml A11.xml A12.xml A13.xml A14.xml A15.xml A16.xml A17.xml A18.xml A19.xml

genBV: BV01.xml BV02.xml BV03.xml BV04.xml BV05.xml BV06.xml BV07.xml BV08.xml BV09.xml \
	BV10.xml BV11.xml BV12.xml BV13.xml BV14.xml

%.xml:
	xsltproc --stringparam catalog moltrecht --stringparam chapter $(basename $(notdir $@)) -o $@ moodle.xslt ../fragen.xml
