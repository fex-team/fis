<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>diff details</title>
    <style type="text/css">
        .del{
            background:#fcc;
        }
        .ins{
            background:#cfc;
        }
        .old{
            background:#fcc;
        }
        .new{
            background:#cfc;
        }
    </style>
</head>

<body>
<p>&nbsp;</p>
<TABLE style="BORDER-COLLAPSE: collapse" borderColor=#000000 height=40 cellPadding=1 width=900 align=left border=1>
    <tr>
        <td width="871" bordercolor="#000000"><span class="STYLE2">红色代表老版本编译后的结果{$old}</span></td>
    </tr>
    <tr>
        <td bordercolor="#000000"><span class="STYLE4">绿色代表新版本编译后的结果{$new}</span></td>
    </tr>
    <tr>
        <td bordercolor="#000000"><span class="STYLE5">diff details</span></td>
    </tr>
    <tr>
        <td bordercolor="#000000">
            <p class="STYLE5">
                    {$diffdata}
            </p>
        </td>
    </tr>
</table>

</body>
</html>
