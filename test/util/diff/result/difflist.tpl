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
.STYLE3 {
    color: red;
    font-size: 24px;
    font-weight: bold;
}
-->
    </style>
</head>

<body>
<table width=1000 border="0" style="overflow:hidden">
  <tr>
    <td bordercolor="#000000"><span class="STYLE3">{$productname}</span><span class="STYLE2"> diff info：</span></td>
  </tr>
  <tr>
    <td bordercolor="#000000">
        <TABLE style="BORDER-COLLAPSE: collapse" borderColor=#000000 height=40 cellPadding=1 align=left border=1>
          <tr>
            <td width="235" bgcolor="#009900">file name</td>
            <td bgcolor="#009900"> new({$newversion}) </td>
            <td bgcolor="#009900"> old({$oldversion}) </td>
          </tr>
          {foreach $difflist as $value}
              <tr>
                <td><a href="{$value.url}">{$value.name}</a></td>
                <td width="359">{$value.new}</td>
                <td width="375">{$value.old}</td>
              </tr>
          {/foreach}
        </table>
    </td>
  </tr>
</table>
</body>
</html>
