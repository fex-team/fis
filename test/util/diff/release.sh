#!/usr/bin/env bash

TEST_PATH=/home/work/repos/fis/test/util/diff
FIS_PATH=/home/work/repos/fis/
cd ${TEST_PATH}
WENKU_CODE_PATH=${TEST_PATH}/product_code/wenku
WENKU_OUTPUT_PATH=${TEST_PATH}/product_output/wenku

TIEBA_CODE_PATH=${TEST_PATH}/product_code/tieba
TIEBA_OUTPUT_PATH=${TEST_PATH}/product_output/tieba

BATMAN_CODE_PATH=${TEST_PATH}/product_code/batman
BATMAN_OUTPUT_PATH=${TEST_PATH}/product_output/batman
BATMAN_MODULES=(transit place common index addr feedback drive walk)

PLACE_CODE_PATH=${TEST_PATH}/product_code/place
PLACE_OUTPUT_PATH=${TEST_PATH}/product_output/place
PLACE_MODULES=(admin beauty cater common detail hotel movie scope)

#获取fis version
if [ $1 = 'new' ]
then
	version=$(node ${FIS_PATH}/bin/fis -v --no-color)
else
	version=$(fis -v --no-color)
fi

OLD_IFS="$IFS" 
IFS=" " 
arr=($version) 
IFS="$OLD_IFS" 
v=${arr[1]}

# 执行release
if [ $1 = 'new' ]
then
	#wenku
	rm -rf ${WENKU_OUTPUT_PATH}/output_new
	cd ${WENKU_CODE_PATH} 
	node ${FIS_PATH}/bin/fis release -md ${WENKU_OUTPUT_PATH}/output_new --no-color
	echo $v > ${WENKU_OUTPUT_PATH}/output_new/fis_version.txt
    chmod 777 ${WENKU_OUTPUT_PATH}	
	
	#tieba
	rm -rf ${TIEBA_OUTPUT_PATH}/output_new
	cd ${TIEBA_CODE_PATH}
	node ${FIS_PATH}/bin/fis release -md ${TIEBA_OUTPUT_PATH}/output_new --no-color
	echo $v > ${TIEBA_OUTPUT_PATH}/output_new/fis_version.txt
    chmod 777 ${TIEBA_OUTPUT_PATH}
	
	#batman
	rm -rf ${BATMAN_OUTPUT_PATH}/output_new
	for module in ${BATMAN_MODULES[@]} 
	do
	    cd ${BATMAN_CODE_PATH}/$module 
	    node ${FIS_PATH}/bin/fis release -md ${BATMAN_OUTPUT_PATH}/output_new --no-color
	done
	echo $v > ${BATMAN_OUTPUT_PATH}/output_new/fis_version.txt
    chmod 777 ${BATMAN_OUTPUT_PATH}	
else
	#wenku
	rm -rf ${WENKU_OUTPUT_PATH}/output_old
	cd ${WENKU_CODE_PATH}
	fis release -md ${WENKU_OUTPUT_PATH}/output_old --no-color
	echo $v > ${WENKU_OUTPUT_PATH}/output_old/fis_version.txt
    chmod 777 -R ${WENKU_OUTPUT_PATH}/output_old	
	
	#tieba
	rm -rf ${TIEBA_OUTPUT_PATH}/output_old
	cd ${TIEBA_CODE_PATH}
	fis release -md ${TIEBA_OUTPUT_PATH}/output_old --no-color
	echo $v > ${TIEBA_OUTPUT_PATH}/output_old/fis_version.txt
    chmod 777 -R ${TIEBA_OUTPUT_PATH}/output_old
	
    #batman
	rm -rf ${BATMAN_OUTPUT_PATH}/output_old
	for module in ${BATMAN_MODULES[@]}
	do
		cd ${BATMAN_CODE_PATH}/$module
		fis release -md ${BATMAN_OUTPUT_PATH}/output_old --no-color
	done
	echo $v > ${BATMAN_OUTPUT_PATH}/output_old/fis_version.txt
    chmod 777 -R ${BATMAN_OUTPUT_PATH}/output_old	
fi
