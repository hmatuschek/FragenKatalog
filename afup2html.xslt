<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
  <xsl:template match="catalog">
    <xsl:apply-templates select="catalog"/>
    <xsl:apply-templates select="q"/>
  </xsl:template>

  <xsl:template match="q">
    <xsl:variable name="qid" select="@ref"/>
    <xsl:apply-templates select="/AfuP/pool/question[@id=$qid]"/>
  </xsl:template>

  <xsl:template match="question">
    <h3><xsl:value-of select="./@name"/></h3>
    <xsl:apply-templates select="text"/>
    <ol>
      <xsl:apply-templates select="answer"/>
    </ol>
  </xsl:template>

  <xsl:template match="text">
    <p><xsl:apply-templates select="p"/></p>
    <p><xsl:apply-templates select="img"/></p>
  </xsl:template>

  <xsl:template match="img">
    <xsl:variable name="imgid" select="@src"/>
    <img>
      <xsl:attribute name="src">data:image/gif;base64,<xsl:value-of select="/AfuP/pool/img[@id=$imgid]"/></xsl:attribute>
      <xsl:attribute name="alt"><xsl:value-of select="$imgid"/></xsl:attribute>
    </img>
  </xsl:template>

  <xsl:template match="answer">
    <li><xsl:apply-templates /></li>
  </xsl:template>

  <xsl:template match="*">
    <xsl:copy><xsl:apply-templates/></xsl:copy>
  </xsl:template>
</xsl:stylesheet>
