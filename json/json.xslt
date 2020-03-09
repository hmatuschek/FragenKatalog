<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
  <xsl:import href="afup2json.xslt"/>
  <xsl:output method="text"/>

  <xsl:variable name="Cat" select="'E'"/>
  <xsl:variable name="Topic" select="'A'"/>
  <xsl:variable name="Block" select="1"/>

  <xsl:template match="/">
    [
      <xsl:apply-templates select="/AfuP/catalog[@id=$Cat]/catalog[@id=$Topic]/catalog[@id=$Block]"/>
    ]
  </xsl:template>
</xsl:stylesheet>
