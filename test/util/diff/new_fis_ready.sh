#!/usr/bin/env bash

TEST_PATH=/home/work/repos/fis/test/util/diff
FIS_PATH=/home/work/repos/fis/
FISP_PATH=/home/work/lib/node_modules/fis-plus
FISP_FIS_PATH=${FISP_PATH}/node_modules/fis

cd ${FIS_PATH}                                                                                                                                npm install
npm install
npm install fis-preprocessor-image-set

npm cache clean
npm update -g fis-plus

rm -rf ${FISP_PATH}/node_modules/fis
cp -r ${FIS_PATH} ${FISP_FIS_PATH}
rm -rf ${FISP_FIS_PATH}/test

sh ${TEST_PATH}/release.sh new
