<?php
/**
 * Created by baidu.fex
 * User: wangfangguo
 * Date: 14-6-18
 * Time: 上午11:41
 */
require_once dirname(__FILE__) . "/TestReport.class.php";
class TestAutoPlugin {
    private $indexjsPath;
    private $libPath;
    private $versionPath;
    private $data;
    private $multiPackPath;
    private $onePackPath;
    private $realUrl,$realVersion;
    function __construct(){
        $this->multiPackPath=dirname(__FILE__)."/svntest/hao123/output/config";
        $this->onePackPath=dirname(__FILE__)."/svntest/tuangou";
        $this->indexjsPath="/home/work/lib/node_modules/fis-packager-autopack/index.js";
        $this->libPath="/home/work/lib/node_modules/fis-packager-autopack/lib/temp";
        $this->versionPath="/home/work/lib/node_modules/fis-postpackager-ext-map/package.json";
        $this->data=array();
    }
    private function verificationApiUrl(){
        $string=file_get_contents($this->indexjsPath);
        $this->realUrl=$string;
        if(strstr($string,"fedev.baidu.com:8889")||strstr($string,"solar.baidu.com"))
            return true;
        else
            return false;
    }
    private function checkWritabel(){
        if(is_writable($this->libPath))
            return true;
        else
            return false;
    }
    private function checkVersion(){
        $data=json_decode(file_get_contents($this->versionPath),true);
        $data=$data["version"];
        $this->realVersion=$data;
        if($data=="0.0.1"||$data=="0.0.0")
            return false;
        else
            return true;
    }
    private function checkFileMulti(){
        $handle=opendir($this->multiPackPath);
        $mapFile=0;
        while(($filename=readdir($handle))!==false){
            if(strstr($filename,"flat-home-map")){
                $mapFile++;
            }
        }
        if($mapFile>1)
            return true;
        else
            return false;
    }
    private function checkFileOne(){
        $pathA=$this->onePackPath."/fis-pack.json";
        $pathB=$this->onePackPath."/output/config/common-map.json";
        if(file_exists($pathA)&&file_exists($pathB))
            return true;
        else
            return false;
    }
    public function startTest(){
        $data=array();
        $arrPosSu=0;
        $arrPosFa=0;
        if($this->verificationApiUrl())
            $data['success'][$arrPosSu++]=array("Api Url"=>$this->realUrl);
        else
            $data['fail'][$arrPosFa++]=array("Api Url"=>$this->realUrl);
        if($this->checkWritabel())
            $data['success'][$arrPosSu++]=array("file Writabel"=>"Writabel");
        else
            $data['fail'][$arrPosFa++]=array("file Writabel"=>"No Writabel");
        if($this->checkVersion())
            $data['success'][$arrPosSu++]=array("ext-map verison"=>"0.0.1");
        else
            $data['fail'][$arrPosFa++]=array("ext-map verison"=>$this->realVersion);
        if($this->checkFileMulti())
            $data['success'][$arrPosSu++]=array("multi map"=>"success");
        else
            $data['fail'][$arrPosFa++]=array("multi map"=>"fail");
        if($this->checkFileOne())
            $data['success'][$arrPosSu++]=array("one map"=>"success");
        else
            $data['fail'][$arrPosFa++]=array("one map"=>"fail");
        $data['name']="auto-plugin";
        $this->data=$data;
    }
    public function getData(){
        return $this->data;
    }
}
$myTest=new TestAutoPlugin();
$myTest->startTest();
$myReport=new TestReport();
$myReport->setData($myTest->getData());
$myReport->createTestReport();
