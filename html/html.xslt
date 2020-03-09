<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
  <xsl:import href="afup2html.xslt"/>
  <xsl:output method="xml"/>

  <xsl:variable name="book" select="'E'"/>
  <xsl:variable name="chapter" select="'E04'"/>

  <xsl:template match="/">
    <html>
      <head>
        <script>
          <xsl:text disable-output-escaping="yes"><![CDATA[
          function shuffleAnsw() {
            var elms = document.getElementsByClassName('#shuffle')
            for (var i=0;elms.length; i++) {
              shuffleChildren(elms[i]);
            }
          }
          function shuffleChildren(element) {
            for (var i = element.children.length; i >= 0; i--) {
              element.appendChild(element.children[Math.random() * i | 0]);
            }
          }
          ]]>
        </xsl:text>
        </script>
      </head>
      <body onload="shuffleAnsw()">
        <xsl:apply-templates select="/AfuP/catalog[@id='moltrecht']/catalog[@id=$book]/catalog[@id=$chapter]"/>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
