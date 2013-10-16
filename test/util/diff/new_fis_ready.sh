#!/usr/bin/env bash

TEST_PATH=/home/work/repos/fis/test/util/diff
FIS_PATH=/home/work/repos/fis/
cd ${FIS_PATH}                                                                                                                                npm install
npm install
npm install fis-preprocessor-inline
sh ${TEST_PATH}/release.sh new
