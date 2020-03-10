all: deploy

deployE: E01.json E02.json E03.json E04.json E05.json E06.json E07.json E08.json E09.json \
		E10.json E11.json E12.json E13.json E14.json E15.json E16.json E17.json E18.json

deploy: deployE
	curl -o deploy/mithril.js https://unpkg.com/mithril/mithril.js

demo: deploy
	python3 -m http.server 8080 --bind localhost

%.json: ../fragen.xml
	xsltproc --stringparam catalog moltrecht --stringparam chapter $(basename $(notdir $@)) -o deploy/$@ ../json/json.xslt ../fragen.xml

.xml:
