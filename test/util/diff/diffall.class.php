<?php
require_once dirname(__FILE__) . "/diff.class.php";

$config = array();
$config = diff::loadConfig(dirname(__FILE__).'/config.php');
$productlist = $config['product'];
$smartyConfig = diff::getConfig('smarty');
require_once $smartyConfig['dir'].'/Smarty.class.php';

foreach($productlist as $pro => $value){
    $diff = new Diff($pro);
//    $diff->build();
//    $diff->analyze();
    $diff->Display();
    $productlist[$pro]['url'] = diff::getConfig('url').str_replace("/home/work/repos/","",
        $smartyConfig['templatedir'].$pro."_difflist.html");
}
$smarty = new Smarty();
$smarty->assign('productsdiff',$productlist);
$html = $smarty->fetch($smartyConfig['templatedir']."/productsdiff.tpl");
File::write($smartyConfig['templatedir']."productsdiff.html",$html);