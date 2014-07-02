<?php
$filePath=file_get_contents("exchange.txt");
$filePath =substr($filePath,0,strlen($filePath)-1);
if(strstr($filePath,"jello"))
    $jsonPath=$filePath."/WEB-INF/config/example-map.json";
else
    $jsonPath=$filePath."/home-map.json";
if(!is_file($jsonPath)) exit;
$strContent = file_get_contents($jsonPath);
$flag=0;
$strContent=json_decode($strContent,true);
$data=$strContent['res'];
foreach($data as $value){
    $src=key($data);next($data);
    $des=$value['uri'];
    if(strstr($src,'.css')||strstr($src,'.js')
        ||strstr($src,'.jpg')||strstr($src,'.png')){
        if(!is_file($filePath.$des)){
            $flag=1;
            break;
        }
        $arrSrc=explode('/',$src);
        $arrDes=explode('/',$des);
        $lastSrc=$arrSrc[count($arrSrc)-1];
        $lastDes=$arrDes[count($arrDes)-1];
        if($lastSrc==$lastDes){
            $flag=1;break;
        }

    }
}
$dom = new DOMDocument("1.0","utf-8");
$xmlFile = dirname(__FILE__)."/result/report.xml";
$tatalCount = 0;
$tatalFailure = 0;
if(file_exists($xmlFile)){
    $dom->load($xmlFile);
    $testsuite = $dom->getElementsByTagName("testsuite")->item(0);
    $totalCount = $testsuite->getAttribute("tests");
    $totalFailure = $testsuite->getAttribute("failures");
}else{
    $testsuites = $dom->createElement("testsuites");
    $dom->appendChild($testsuites);
    $testsuite = $dom->createElement("testsuite");
    $testsuites->appendChild($testsuite);
}
if($flag){
    $totalCount+=1;
    $totalFailure+=1;
    $testsuite->setAttribute("name","md5*  ");
    $testsuite->setAttribute("tests",$totalCount);
    $testsuite->setAttribute("time",$totalCount);
    $testsuite->setAttribute("failures",$totalFailure);
    $testsuite->setAttribute("total",$totalCount);

    $testcase=$dom->createElement("testcase");
    $testsuite->appendChild($testcase);
    $testcase->setAttribute("name","testcase0");
    $testcase->setAttribute("time","1");
    $testcase->setAttribute("failures","1");
    $testcase->setAttribute("total","1");
}else{
    $totalCount++;
    $testsuite->setAttribute("name","md5*  ");
    $testsuite->setAttribute("tests",$totalCount);
    $testsuite->setAttribute("time",$totalCount);
    $testsuite->setAttribute("failures",$totalFailure);
    $testsuite->setAttribute("total",$totalCount);

    $testcase=$dom->createElement("testcase");
    $testsuite->appendChild($testcase);
    $testcase->setAttribute("name","testcase0");
    $testcase->setAttribute("time","1");
    $testcase->setAttribute("failures",0);
    $testcase->setAttribute("total",1);
}
$dom->save($xmlFile);
?>
