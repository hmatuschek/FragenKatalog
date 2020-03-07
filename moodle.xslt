<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:import href="afup2moodle.xslt"/>
  <xsl:output method="xml" cdata-section-elements="text"/>

  <xsl:variable name="book" select="'E'"/>
  <xsl:variable name="chapter" select="'E04'"/>

  <xsl:template match="/">
  <quiz>
    <question type="category"><category><text><xsl:copy-of select="$chapter"/></text></category></question>
    <xsl:apply-templates select="/AfuP/catalog[@id='moltrecht']/catalog[@id=$book]/catalog[@id=$chapter]"/>
  </quiz>
  </xsl:template>
</xsl:stylesheet>
