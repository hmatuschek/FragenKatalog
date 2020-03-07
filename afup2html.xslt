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
    <h3><xsl:value-of select="./@name"/></h3>
    <xsl:apply-templates select="text"/>
    <table>
      <tbody class="#shuffle">
        <xsl:apply-templates select="answer"/>
      </tbody>
    </table>
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
    <tr>
      <td width="70"><xsl:if test="@correct='yes'"><input value="--?--" onclick="value='Richtig'" type="button"/></xsl:if>
      <xsl:if test="@correct='no'"><input value="--?--" onclick="value='Falsch'" type="button"/></xsl:if></td>
      <td><xsl:apply-templates /></td>
    </tr>
  </xsl:template>

  <xsl:template match="*">
    <xsl:copy><xsl:apply-templates/></xsl:copy>
  </xsl:template>
</xsl:stylesheet>
