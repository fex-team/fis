<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>diff file list</title>
    <style type="text/css">
<!--
.STYLE1 {
	font-size: 24px;
	font-weight: bold;
}
.STYLE2 {
	color: #000000;
	font-size: 24px;
	font-weight: bold;
}
-->
    </style>
</head>

<body>
<p class="STYLE2">product difflist info：</p>
<TABLE style="BORDER-COLLAPSE: collapse" borderColor=#000000 height=40 cellPadding=1 width=900 align=left border=1>
  <tr>
    <td width="277" bgcolor="#009900">product name</td>
    <td bgcolor="#009900">diff result </td>
  </tr>
{foreach $productsdiff as $value}
  <tr>
    
    <td>{$value.name}</td>
	<td><a href="{$value.url}">click here >></a></td>
  </tr>
{/foreach}
</table>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p class="STYLE1">&nbsp;</p>
</body>
</html>
