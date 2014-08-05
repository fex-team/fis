#!/bin/sh
npm install -g fis-postpackager-ext-map
npm install -g fis-packager-autopack
npm isntall -g fis-parser-bainuo-less
if [ -d "./result" ]; then
rm -r result
fi
wget -O a.txt  "http://fedev.baidu.com:8803/autopack?return=json&fid=baidunuomi&svn=https://svn.baidu.com/app/search/tuangou/branches/mobile-bainuo/common/tuangou_4-3-102_BRANCH"
wget -O b.txt  "http://solar.baidu.com/autopack?return=json&fid=baidunuomi&svn=https://svn.baidu.com/app/search/tuangou/branches/mobile-bainuo/common/tuangou_4-3-102_BRANCH"
if [ ! -d "./result" ]; then
  mkdir result
fi
php TestStaticPack.php
rm a.txt b.txt
wget -O a.txt "http://fedev.baidu.com:8803/autopack?return=json&fid=globalhao123&svn=https://svn.baidu.com/app/global/hao123/branches/fe/flat-home/hao123_1-0-988_BRANCH"
wget -O b.txt "http://solar.baidu.com/autopack?return=json&fid=globalhao123&svn=https://svn.baidu.com/app/global/hao123/branches/fe/flat-home/hao123_1-0-988_BRANCH"
php TestStaticPack.php
rm a.txt b.txt
npm uninstall -g fis-postpackager-ext-map
npm uninstall -g fis-packager-autopack
npm uninstall -g fis-parser-bainuo-less