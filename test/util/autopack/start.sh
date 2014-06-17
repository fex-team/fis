#!/bin/sh
wget -O a.txt  "http://solar.baidu.com/autopack?return=json&fid=baidunuomi&svn=https://svn.baidu.com/app/search/tuangou/branches/mobile-bainuo/common/tuangou_4-3-102_BRANCH"
wget -O b.txt  "http://fedev.baidu.com:8803/autopack?return=json&fid=baidunuomi&svn=https://svn.baidu.com/app/search/tuangou/branches/mobile-bainuo/common/tuangou_4-3-102_BRANCH"
if [ ! -d "./result" ]; then
mkdir result
fi
php TestStaticPack.php
rm a.txt b.txt