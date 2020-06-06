vpath %.json deploy/

all: deploy

clean:
	rm -f deploy/*.json
	rm -f deploy/mithril.js

deployE: E01.json E02.json E03.json E04.json E05.json E06.json E07.json E08.json E09.json \
		E10.json E11.json E12.json E13.json E14.json E15.json E16.json E17.json E18.json

deployA: A01.json A02.json A03.json A04.json A05.json A06.json A07.json A08.json A09.json \
				A10.json A11.json A12.json A13.json A14.json A15.json A16.json A17.json A18.json A19.json

deployBV: BV01.json BV02.json BV03.json BV04.json BV05.json BV06.json BV07.json BV08.json BV09.json \
						BV10.json BV11.json BV12.json BV13.json BV14.json

deploy: deployE deployA deployBV
	wget -O deploy/mithril.js https://unpkg.com/mithril/mithril.js
.PHONY: deploy

demo: deploy
	python3 -m http.server 8080 --bind localhost

%.json: ../fragen.xml
	xsltproc --stringparam catalog Moltrecht --stringparam chapter $(basename $(notdir $@)) -o deploy/$@ ../json/json.xslt ../fragen.xml
