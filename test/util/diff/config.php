<?php
/** 根目录地址 */
if(!defined('DIFF_ROOT_PATH')) define('DIFF_ROOT_PATH', str_replace('\\', '/', dirname(__FILE__)) . '/');
/** 定义和产品线相关的产出目录 */
if(!defined('WENKU_PATH')) define('WENKU_PATH',DIFF_ROOT_PATH.'product_output/wenku/' );
if(!defined('BATMAN_PATH')) define('BATMAN_PATH',DIFF_ROOT_PATH.'product_output/batman/' );
if(!defined('PLACE_PATH')) define('PLACE_PATH',DIFF_ROOT_PATH.'product_output/place/' );
if(!defined('TIEBA_PATH')) define('TIEBA_PATH',DIFF_ROOT_PATH.'product_output/tieba/' );

$config = array(
    'product'=>array(      //产品线目录
        'wenku'=>array(
            'name'=>'wenku',
            'newoutputdir' => WENKU_PATH.'output_new',    //使用新版本编译后的产出
            'oldoutputdir' => WENKU_PATH.'output_old',  //使用旧版本编译后的产出
            "modules" =>"bookeditor", //待编译的模块
            'result' => WENKU_PATH.'result/'
        ),
        'batman'=>array(
            'name'=>'batman',
            'newoutputdir' => BATMAN_PATH.'output_new',    //使用新版本编译后的产出
            'oldoutputdir' => BATMAN_PATH.'output_old',  //使用旧版本编译后的产出
            "modules" =>"transit,place,common,index,addr,feedback,drive,walk", //待编译的模块
            'result' => BATMAN_PATH.'result/'
        ),
        'tieba'=>array(
            'name'=>'tieba',
            'newoutputdir' => TIEBA_PATH.'output_new',    //使用新版本编译后的产出
            'oldoutputdir' => TIEBA_PATH.'output_old',  //使用旧版本编译后的产出
            "modules" =>"xpb", //待编译的模块
            'result' => TIEBA_PATH.'result/'
        )
    ),
    'smarty' => array(
        'dir' => DIFF_ROOT_PATH.'../../libs/smarty-3.1.5',
        'templatedir' =>DIFF_ROOT_PATH. 'result/'
    ),
    'url' =>"http://10.48.30.87:8088/"
);