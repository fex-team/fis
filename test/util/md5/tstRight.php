<?php
         $filePath=file_get_contents("exchange.txt");
         $filePath =substr($filePath,0,strlen($filePath)-1);
         if(strstr($filePath,"jello"))
                $jsonPath=$filePath."/WEB-INF/config/example-map.json";
         else
                $jsonPath=$filePath."/home-map.json";
         if(!is_file($jsonPath)) exit;
         $strContent = file_get_contents($jsonPath);
         //echo $strContent; 
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
         if($flag){
                echo "no md5!";
                exit;
         }
         echo "success!";
?>
