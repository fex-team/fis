<?php
/**
 * Created by PhpStorm.
 * User: wangfangguo
 * Date: 14-6-17
 * Time: 下午4:20
 */
require_once dirname(__FILE__)."/TestReport.class.php";
class TestStaticPack{
    private  $fileData1;
    private  $fileData2;
    private  $data;
    private  $rate;
    function __construct(){
        $this->rate=0;
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
            $outdata=array();
            foreach($data2 as $key2=>$arrValue2){
                if(array_key_exists($key2,$hash)) continue;
                $num=0;
                $data=array();
                foreach($arrValue1 as $value1){
                    if(in_array($value1,$arrValue2))
                        $num++;
                    else
                        $data[]=array($value1=>"diff");
                }
                if($num>=(count($arrValue1)+1)/2){
                    foreach($data as $v){
                        $this->data["fail"][]=$v;
                    }
                    $hash[$key2]=1;
                    $sumTrue+=$num;
                    break;
                }
                if($num>$max){
                    $max=$num;
                    $outdata=$data;
                    $tmp=key($arrValue2);
                }
                unset($data);
            }
            if(!array_key_exists($tmp,$hash)){
                foreach($outdata as $v){
                    $this->data["fail"][]=$v;
                }
                $hash[$tmp]=1;
                $sumTrue+=$max;
            }
            unset($outdata);
        }
        return ($sumTrue/$sumStatic);
    }
    public function getResult(){
        $this->rate=$this->calculate($this->fileData1,$this->fileData2);
        if($this->rate>0.95)
            $this->data['success'][0]=array("diff autopack"=>"success");
        $this->data["name"]="autopack";
        return $this->rate;
    }
    public function getData(){
        return $this->data;
    }
};
$case=new TestStaticPack();
$case->setFile("a.txt","b.txt");
$case->getResult();
$report=new TestReport();
$report->setData($case->getData());
$report->createTestReport();
?>