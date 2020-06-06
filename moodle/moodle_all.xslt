<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:import href="afup2moodle.xslt"/>
  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="/">
  <quiz>
    <xsl:for-each select="/AfuP/catalog[@id='Moltrecht']/catalog[@id='E']/catalog">
      <question type="category"><category><text>$course$/Moltrecht E/<xsl:value-of select="@id"/></text></category></question>
      <xsl:apply-templates/>
    </xsl:for-each>
    <xsl:for-each select="/AfuP/catalog[@id='Moltrecht']/catalog[@id='A']/catalog">
      <question type="category"><category><text>$course$/Moltrecht A/<xsl:value-of select="@id"/></text></category></question>
      <xsl:apply-templates/>
    </xsl:for-each>
    <xsl:for-each select="/AfuP/catalog[@id='Moltrecht']/catalog[@id='BV']/catalog">
      <question type="category"><category><text>$course$/Moltrecht BV/<xsl:value-of select="@id"/></text></category></question>
      <xsl:apply-templates/>
    </xsl:for-each>
  </quiz>
  </xsl:template>
</xsl:stylesheet>
