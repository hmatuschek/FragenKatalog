<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
  <xsl:import href="afup2json.xslt"/>
  <xsl:output method="text"/>

  <xsl:param name="catalog"/>
  <xsl:param name="book"/>
  <xsl:param name="chapter"/>

  <xsl:template match="/">
    [
      <xsl:apply-templates select="/AfuP/catalog[@id=$catalog]/catalog[starts-with(@id,$book)]/catalog[starts-with(@id,$chapter)]"/>
    ]
  </xsl:template>
</xsl:stylesheet>
