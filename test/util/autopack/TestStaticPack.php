<?php
/**
 * Created by PhpStorm.
 * User: wangfangguo
 * Date: 14-6-17
 * Time: 下午4:20
 */
class TestStaticPack{
    private  $fileData1;
    private  $fileData2;
    private  $result;
    private  $rate1,$rate2;
    function __construct(){
        $this->sumStatic=0;
        $this->sumTrue=0;
        $this->result=0;
    }
    public function setFile($file1,$file2){
        $this->fileData1=$file1;
        $this->fileData2=$file2;
    }
    private function getJsonData($filePath){
        $fileData=file_get_contents($filePath);
        $fileData=json_decode($fileData,true);
        return $fileData['data']['_default'];
    }
    private function calculate($data1,$data2){
        $data1=$this->getJsonData($data1);
        $data2=$this->getJsonData($data2);
        $sumStatic=0;
        $sumTrue=0;
        foreach($data1 as $key => $value){
            $sumStatic+=count($value);
        }
        $hash=array();
        foreach($data1 as $key1=>$arrValue1){
            $max=0;
            $tmp="";
            foreach($data2 as $key2=>$arrValue2){
                if(array_key_exists($key2,$hash)) continue;
                $num=0;
                foreach($arrValue1 as $value1){
                    if(in_array($value1,$arrValue2)){
                        $num++;
                    }
                }
                if($num>=(count($arrValue1)+1)/2){
                    $hash[$key2]=1;
                    $sumTrue+=$num;
                    break;
                }
                if($num>$max){
                    $max=$num;
                    $tmp=key($arrValue2);
                }
            }
            if(!array_key_exists($tmp,$hash)){
                $hash[$tmp]=1;
                $sumTrue+=$max;
            }
        }
        return ($sumTrue/$sumStatic);
    }
    public function getResult(){
        $this->rate1=$this->calculate($this->fileData1,$this->fileData2);
        $this->rate2=$this->calculate($this->fileData2,$this->fileData1);
        $this->result=max($this->rate1,$this->rate2);
        return $this->result;
    }
    public function createTestReport(){
        $dom = new DOMDocument("1.0","utf-8");
        $xmlFile = dirname(__FILE__)."/result/report.xml";
        $totalCount = 0;
        $totalFailure = 0;
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
        if($this->result<0.95){
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
    }
};
$case=new TestStaticPack();
$case->setFile("a.txt","b.txt");
$case->getResult();
$case->createTestReport();
?>