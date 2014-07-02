#!/usr/bin/env bash

TEST_PATH=/home/work/repos/fis/test/util/diff
cd ${TEST_PATH}

PLACE_SVN=https://svn.baidu.com/app/search/lbs-webapp/trunk/pcmap/place
PLACE_DIR=./product_code/place

BATMAN_SVN=https://svn.baidu.com/app/search/lbs-webapp/trunk/mmap/batman
BATMAN_DIR=./product_code/batman

WENKU_SVN=https://svn.baidu.com/app/search/wenku/branches/fe/bookeditor/wenku_1001-0-253_BRANCH
WENKU_DIR=./product_code/wenku

TIEBA_SVN=https://svn.baidu.com/app/search/forum/branches/fe/pad/xpad/pb/xpadpb_1-0-0_BRANCH
TIEBA_DIR=./product_code/tieba

HAO123_SVN=https://svn.baidu.com/app/global/hao123/trunk/fe
HAO123_DIR=./product_code/hao123

SUPERMAN_SVN=https://svn.baidu.com/app/search/lbs-webapp/trunk/mmap/superman
SUPERMAN_DIR=./product_code/superman

svn co --username=$1 --password=$2 --no-auth-cache ${PLACE_SVN} ${PLACE_DIR}
svn co --username=$1 --password=$2 --no-auth-cache ${BATMAN_SVN} ${BATMAN_DIR}
svn co --username=$1 --password=$2 --no-auth-cache ${WENKU_SVN} ${WENKU_DIR}
svn co --username=$1 --password=$2 --no-auth-cache ${TIEBA_SVN} ${TIEBA_DIR}
svn co --username=$1 --password=$2 --no-auth-cache ${HAO123_SVN}/common ${HAO123_DIR}/common
svn co --username=$1 --password=$2 --no-auth-cache ${HAO123_SVN}/home ${HAO123_DIR}/home
svn co --username=$1 --password=$2 --no-auth-cache ${HAO123_SVN}/lv2 ${HAO123_DIR}/lv2
svn co --username=$1 --password=$2 --no-auth-cache ${SUPERMAN_SVN} ${SUPERMAN_DIR}
