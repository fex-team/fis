#!/usr/bin/env bash

TEST_PATH=/home/work/repos/fis/test/util/diff
cd ${TEST_PATH}

BATMAN_SVN=https://svn.baidu.com/app/search/lbs-webapp/trunk/mmap/batman
BATMAN_DIR=./product_code/batman

WENKU_SVN=https://svn.baidu.com/app/search/wenku/branches/fe/bookeditor/wenku_1001-0-253_BRANCH
WENKU_DIR=./product_code/wenku

TIEBA_SVN=https://svn.baidu.com/app/search/forum/branches/fe/pad/xpad/pb/xpadpb_1-0-0_BRANCH
TIEBA_DIR=./product_code/tieba

svn co --username=tianlili --password=tianlili --no-auth-cache ${BATMAN_SVN} ${BATMAN_DIR}
svn co --username=tianlili --password=tianlili --no-auth-cache ${WENKU_SVN} ${WENKU_DIR}
svn co --username=tianlili --password=tianlili --no-auth-cache ${TIEBA_SVN} ${TIEBA_DIR}
