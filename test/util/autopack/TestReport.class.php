<?php
/**
 * Created by baidu fex.
 * User: wangfangguo
 * Date: 14-6-18
 * Time: 上午11:52
 */
/*
 * 传入数据格式
Array
(
    [fail] => Array
    (
        [0] => Array
        (
            [/widget/hot-site/hot-site-async.js] => diff
        )

            [1] => Array
            (
                [/widget/sidetoolbar/sidetoolbar-async.js] => diff
            )

            [2] => Array
            (
                [/widget/sort-area/shop/shop-async.js] => diff
            )

    )

    [success] => Array
    (
        [0] => Array
        (
            [diff autopack] => success
        )
    )

    [name] => autopack
)
*/
class TestReport {
    private $data;
    public function __construct(){
        $this->data=array();
    }
    public function setData($data){
        $this->data=$data;
        print_r($data);
    }
    public function createTestReport(){
        $dom = new DOMDocument("1.0","utf-8");
        $xmlFile = dirname(__FILE__)."/result/report.xml";
        $data=$this->data;
        $totalCount=0;
        $totalFailure=0;
        $Count = 0;
        $Failure = 0;
        if(file_exists($xmlFile)){
            $dom->load($xmlFile);
            $testsuite = $dom->getElementsByTagName("testsuite")->item(0);
            $totalCount = $testsuite->getAttribute("tests");
            $totalFailure = $testsuite->getAttribute("failures");
        }else{
            $testsuite = $dom->createElement("testsuite");
            $dom->appendChild($testsuite);
        }
        $name=$data['name'];
        if(array_key_exists("success",$data)){
            $Count = count($data['success']);
            $totalCount += $Count;
        }
        if(array_key_exists("fail",$data)){
            $Failure = count($data['fail']);
            $Count += count($data['fail']);
            $totalFailure += $Failure;
            $totalCount += $Count;
        }
        $testsuite->setAttribute("name","$name*  ");
        $testsuite->setAttribute("tests",$totalCount);
        $testsuite->setAttribute("time",$totalCount);
        $testsuite->setAttribute("failures",$totalFailure);
        $testsuite->setAttribute("total",$totalCount);
        for($i=$Failure;$i<$Count;$i++){
            $testcase=$dom->createElement("testcase");
            $testsuite->appendChild($testcase);
            $testcase->setAttribute("name",key($data["success"][$i-$Failure]));
            $testcase->setAttribute("time","1");
            $testcase->setAttribute("failures","0");
            $testcase->setAttribute("total","1");
            $testcase->setAttribute("type","OK");
            $msgText = $dom->createTextNode(current($data["success"][$i-$Failure]));
            $testcase->appendChild($msgText);
        }
        for($i=0;$i<$Failure;$i++){
            $testcase=$dom->createElement("testcase");
            $testsuite->appendChild($testcase);
            $testcase->setAttribute("name",key($data["fail"][$i]));
            $testcase->setAttribute("time","1");
            $testcase->setAttribute("failures","1");
            $testcase->setAttribute("total","1");

            $failure = $dom->createElement("failure");
            $testcase->appendChild($failure);
            $failure->setAttribute("type","junit.framework.AssertionFailedError");
            $msgText = $dom->createTextNode(current($data["fail"][$i]));
            $failure->appendChild($msgText);
        }
        $dom->save($xmlFile);
    }
} 