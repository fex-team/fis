#!/bin/sh
npm install -g fis-postpackager-ext-map
npm install -g fis-packager-autopack
npm isntall -g fis-parser-bainuo-less
mkdir svntest
cd ./svntest
mkdir hao123
mkdir tuangou
svn co  --username wangfangguo --password WOAImingtian123 https://svn.baidu.com/app/global/hao123/branches/fe/flat-home/hao123_1-0-988_BRANCH ./hao123
svn co  --username wangfangguo --password WOAImingtian123 https://svn.baidu.com/app/search/tuangou/branches/mobile-bainuo/common/tuangou_4-3-102_BRANCH ./tuangou
cd ./hao123
fisp release -p -d ./output
cd ..
cd ./tuangou
fisp release -p -d ./output
cd ../..
if [ ! -d "./result" ]; then
mkdir result
fi
php TestAutoPlugin.php
npm uninstall -g fis-postpackager-ext-map
npm uninstall -g fis-packager-autopack
npm uninstall -g fis-parser-bainuo-less
rm -r svntest
if [ -d "./result" ]; then
rm -r result
fi