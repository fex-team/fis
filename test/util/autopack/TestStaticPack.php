<?php
/**
 * Created by baidu fex.
 * User: wangfangguo
 * Date: 14-6-17
 * Time: 下午4:20
 */
require_once dirname(__FILE__)."/TestReport.class.php";
class TestStaticPack{
    private  $fileData1;
    private  $fileData2;
    private  $data;
    function __construct(){
        $this->data['fail'] = array();
    }
    public function setFile($file1,$file2){
        $this->fileData1=$file1;
        $this->fileData2=$file2;
    }
    private function getJsonData($filePath){
        $fileData=file_get_contents($filePath);
        $fileData=json_decode($fileData,true);
        $arr = array();
        foreach($fileData['data'] as $pack){
            foreach($pack as $key=>$value){
                $arr[$key]=$value;
            }
        }
        return $arr;
    }
    private function calculate($data1,$data2){
        $data1=$this->getJsonData($data1);
        $data2=$this->getJsonData($data2);
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
                        array_push($data,array($value1=>"diff"));
                }
                if($num>=(count($arrValue2)+1)/2){
                    foreach($data as $v){
                        array_push($this->data["fail"],$v);
                    }
                    $tmp = $key2;
                    $hash[$key2]=1;
                    break;
                }
                if($num>$max||$max == 0){
                    $max=$num;
                    $outdata=$data;
                    $tmp=$key2;
                }
                unset($data);
            }
            if(!array_key_exists($tmp,$hash)){
                foreach($outdata as $v){
                    array_push($this->data["fail"],$v);
                }
                $hash[$tmp]=1;
            }
            unset($outdata);
        }
    }

    public function getResult(){
        $this->calculate($this->fileData1,$this->fileData2);
        $this->data["name"]="autopack";
        $this->data['success'][0]=array("diff autopack"=>"success");
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