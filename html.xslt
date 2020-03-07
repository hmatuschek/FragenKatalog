<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
  <xsl:import href="afup2html.xslt"/>
  <xsl:output method="xml"/>

  <xsl:template match="/">
    <html>
      <head>
      </head>
      <body>
        <xsl:apply-templates select="/AfuP/catalog[@id='moltrecht']/catalog[@id='E']/catalog[@id='E03']"/>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
