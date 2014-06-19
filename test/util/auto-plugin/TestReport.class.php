<?php
/**
 * Created by baidu fex.
 * User: wangfangguo
 * Date: 14-6-18
 * Time: 上午11:52
 */
class TestReport {
    private $data;
    public function __construct(){
        $this->data=array();
    }
    public function setData($data){
        $this->data=$data;
    }
    public function createTestReport(){
        $dom = new DOMDocument("1.0","utf-8");
        $xmlFile = dirname(__FILE__)."/result/report.xml";
        $data=$this->data;
        $totalCount=0;
        $totalFailure=0;
        if(count($data)==0){
            echo "no array data!";
            exit;
        }
        $name=$data['name'];
        if(array_key_exists("success",$data))
            $totalCount = count($data['success']);
        if(array_key_exists("fail",$data)){
            $totalFailure = count($data['fail']);
            $totalCount+=count($data['fail']);
        }
        $testsuites = $dom->createElement("testsuites");
        $dom->appendChild($testsuites);
        $testsuite = $dom->createElement("testsuite");
        $testsuites->appendChild($testsuite);
        $testsuite->setAttribute("name","$name*  ");
        $testsuite->setAttribute("tests",$totalCount);
        $testsuite->setAttribute("time",$totalCount);
        $testsuite->setAttribute("failures",$totalFailure);
        $testsuite->setAttribute("total",$totalCount);
        for($i=$totalFailure;$i<$totalCount;$i++){
            $testcase=$dom->createElement("testcase");
            $testsuite->appendChild($testcase);
            $testcase->setAttribute("name",key($data["success"][$i-$totalFailure]));
            $testcase->setAttribute("time","1");
            $testcase->setAttribute("failures","0");
            $testcase->setAttribute("total","1");
            $testcase->setAttribute("type","OK");
            $msgText = $dom->createTextNode(current($data["success"][$i-$totalFailure]));
            $testcase->appendChild($msgText);
        }
        for($i=0;$i<$totalFailure;$i++){
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