<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
  <xsl:import href="afup2json.xslt"/>
  <xsl:output method="text"/>

  <xsl:template match="/">
    [
      <xsl:apply-templates select="/AfuP/catalog[@id='E']/catalog[@id='C']"/>
    ]
  </xsl:template>
</xsl:stylesheet>
