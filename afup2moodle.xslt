<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="catalog">
    <xsl:apply-templates select="catalog"/>
    <xsl:apply-templates select="q"/>
  </xsl:template>

  <xsl:template match="q">
    <xsl:variable name="qid" select="@ref"/>
    <xsl:apply-templates select="/AfuP/pool/question[@id=$qid]"/>
  </xsl:template>

  <xsl:template match="question">
    <question type="multichoice">
      <name><text><xsl:value-of select="./@name"/></text></name>
      <questiontext>
        <text><xsl:apply-templates select="text"/></text>
      </questiontext>
      <xsl:apply-templates select="answer"/>
    </question>
  </xsl:template>

  <xsl:template match="text"> <xsl:apply-templates select="p"/><xsl:apply-templates select="img"/></xsl:template>

  <xsl:template match="img">
    <xsl:variable name="imgid" select="@src"/>
    <img>
      <xsl:attribute name="src">data:image/gif;base64,<xsl:value-of select="/AfuP/pool/img[@id=$imgid]"/></xsl:attribute>
      <xsl:attribute name="alt"><xsl:value-of select="$imgid"/></xsl:attribute>
    </img>
  </xsl:template>

  <xsl:template match="answer">
    <answer>
      <xsl:if test="@correct='yes'"><xsl:attribute name="fraction">100</xsl:attribute></xsl:if>
      <xsl:if test="@correct='no'"><xsl:attribute name="fraction">0</xsl:attribute></xsl:if>
      <text><xsl:apply-templates /></text>
      <xsl:if test="@correct='yes'"><feedback><text><![CDATA[Korrekt!]]></text></feedback></xsl:if>
      <xsl:if test="@correct='no'"><feedback><text><![CDATA[Leider falsch.]]></text></feedback></xsl:if>
    </answer>
  </xsl:template>

  <xsl:template match="*">
    <xsl:copy><xsl:apply-templates/></xsl:copy>
  </xsl:template>
</xsl:stylesheet>
