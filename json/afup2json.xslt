<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
  <xsl:template match="catalog">
    <xsl:apply-templates select="catalog"/>
    <xsl:for-each select="q"><xsl:apply-templates select="."/><xsl:if test="position()!=last()">,</xsl:if></xsl:for-each>
  </xsl:template>

  <xsl:template match="q">
    <xsl:variable name="qid" select="@ref"/>
    <xsl:apply-templates select="/AfuP/pool/question[@id=$qid]"/>
  </xsl:template>

  <xsl:template match="question">
    {
     "name":"<xsl:value-of select="./@name"/>",
     "id":"<xsl:value-of select="./@id"/>",
     "text":"<xsl:apply-templates select="text"/>",
     "answer":[<xsl:for-each select="answer"><xsl:apply-templates select="."/><xsl:if test="position()!=last()">,</xsl:if></xsl:for-each>]
    }
  </xsl:template>

  <xsl:template match="text">
    <xsl:variable name="input"><xsl:apply-templates select="p"/></xsl:variable>
    <xsl:variable name="result">
      <xsl:call-template name="replace">
        <xsl:with-param name="string" select="$input"/>
        <xsl:with-param name="search" select="'&quot;'" />
        <xsl:with-param name="replace-with" select="'\&quot;'" />
      </xsl:call-template>
    </xsl:variable>
    <xsl:value-of select="$result" disable-output-escaping="yes"/><xsl:apply-templates select="img"/>
  </xsl:template>

  <xsl:template match="answer">
    {"correct":<xsl:if test="@correct='yes'">true</xsl:if><xsl:if test="@correct='no'">false</xsl:if>,"text":"<xsl:variable name="input"><xsl:apply-templates/></xsl:variable><xsl:variable name="result"><xsl:call-template name="replace"><xsl:with-param name="string" select="$input"/><xsl:with-param name="search" select="'&quot;'" /><xsl:with-param name="replace-with" select="'\&quot;'" /></xsl:call-template></xsl:variable><xsl:value-of select="$result" disable-output-escaping="yes" />"}
  </xsl:template>

  <xsl:template match="img"><xsl:variable name="imgid" select="@src"/>&lt;br/&gt;&lt;img src='data:image/<xsl:value-of select="/AfuP/pool/img[@id=$imgid]/@type"/>;base64,<xsl:value-of select="/AfuP/pool/img[@id=$imgid]"/>' alt='<xsl:value-of select="$imgid"/>'/&gt;</xsl:template>
  <xsl:template match="p">&lt;p&gt;<xsl:apply-templates/>&lt;/p&gt;</xsl:template>
  <xsl:template match="br">&lt;br&gt;</xsl:template>
  <xsl:template match="sup">&lt;sup&gt;<xsl:value-of select="."/>&lt;/sup&gt;</xsl:template>
  <xsl:template match="sub">&lt;sub&gt;<xsl:value-of select="."/>&lt;/sub&gt;</xsl:template>
  <xsl:template match="*"><xsl:value-of select="."/></xsl:template>

  <xsl:template name="replace">
    <xsl:param name="string" />
    <xsl:param name="search" />
    <xsl:param name="replace-with" />
    <xsl:choose>
      <xsl:when test="contains($string, $search)">
        <xsl:value-of select="substring-before($string, $search)" />
        <xsl:value-of select="$replace-with" />
        <xsl:call-template name="replace">
          <xsl:with-param name="string" select="substring-after($string, $search)" />
          <xsl:with-param name="search" select="$search" />
          <xsl:with-param name="replace-with" select="$replace-with" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$string" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>
