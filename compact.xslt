<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output indent="no" method="xml"/>
    <xsl:strip-space elements="answer p pre u"/>
    <xsl:preserve-space elements="AfuP pool question catalog text"/>

    <xsl:template match="@*|node()"><xsl:copy><xsl:apply-templates select="@*|node()"/></xsl:copy></xsl:template>
    <xsl:template match="text()"><xsl:value-of select="normalize-space(.)" /></xsl:template>
</xsl:stylesheet>
