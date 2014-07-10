#!/usr/bin/env bash

TEST_PATH=/home/work/repos/fis/test/util/diff
FIS_PATH=/home/work/repos/fis/
NEW_FISP_FIS_PATH=/home/work/lib/node_modules/fis-plus/node_modules/fis
OLD_FISP_FIS_PATH=/home/fis/npm/lib/node_modules/fis-plus/node_modules/fis/
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

HAO123_CODE_PATH=${TEST_PATH}/product_code/hao123
HAO123_OUTPUT_PATH=${TEST_PATH}/product_output/hao123
HAO123_MODULES=(common home lv2)

SUPERMAN_CODE_PATH=${TEST_PATH}/product_code/superman
SUPERMAN_OUTPUT_PATH=${TEST_PATH}/product_output/superman
SUPERMAN_MODULES=(transit place common index addr feedback drive walk third taxi user)

#获取fis version
if [ $1 = 'new' ]
then
	version=$(node ${NEW_FISP_FIS_PATH}/bin/fis -v --no-color)
else
	version=$(node ${OLD_FISP_FIS_PATH}/bin/fis -v --no-color)
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
	rm -rf ${WENKU_OUTPUT_PATH}/output_o_new
	cd ${WENKU_CODE_PATH} 
	${NEW_FISP_FIS_PATH}/bin/fis release -cd ${WENKU_OUTPUT_PATH}/output_o_new --no-color
	echo $v > ${WENKU_OUTPUT_PATH}/output_o_new/fis_version.txt
    chmod 777 ${WENKU_OUTPUT_PATH}	
	
	#tieba
	rm -rf ${TIEBA_OUTPUT_PATH}/output_o_new
	cd ${TIEBA_CODE_PATH}
	${NEW_FISP_FIS_PATH}/bin/fis release -copd ${TIEBA_OUTPUT_PATH}/output_o_new --no-color
	echo $v > ${TIEBA_OUTPUT_PATH}/output_o_new/fis_version.txt
    chmod 777 ${TIEBA_OUTPUT_PATH}
	
	#batman
	rm -rf ${BATMAN_OUTPUT_PATH}/output_o_new
	for module in ${BATMAN_MODULES[@]} 
	do
	    cd ${BATMAN_CODE_PATH}/$module 
	    fisp release -copd ${BATMAN_OUTPUT_PATH}/output_o_new --no-color
	done
	echo $v > ${BATMAN_OUTPUT_PATH}/output_o_new/fis_version.txt
    chmod 777 ${BATMAN_OUTPUT_PATH}

    #place
    rm -rf ${PLACE_OUTPUT_PATH}/output_o_new
    for module in ${PLACE_MODULES[@]}
    do
        cd ${PLACE_CODE_PATH}/$module
        fisp release -copd ${PLACE_OUTPUT_PATH}/output_o_new --no-color
    done
    echo $v > ${PLACE_OUTPUT_PATH}/output_o_new/fis_version.txt
    chmod 777 ${PLACE_OUTPUT_PATH}

    #hao123
    rm -rf ${HAO123_OUTPUT_PATH}/output_o_new
    for module in ${HAO123_MODULES[@]}
    do
        cd ${HAO123_CODE_PATH}/$module
        fisp release -copd ${HAO123_OUTPUT_PATH}/output_o_new --no-color
    done
    echo $v > ${HAO123_OUTPUT_PATH}/output_o_new/fis_version.txt
    chmod 777 ${HAO123_OUTPUT_PATH}

    #superman
    rm -rf ${SUPERMAN_OUTPUT_PATH}/output_o_new
    for module in ${SUPERMAN_MODULES[@]}
    do
        cd ${SUPERMAN_CODE_PATH}/$module
        fisp release -copd ${SUPERMAN_OUTPUT_PATH}/output_o_new --no-color
    done
    echo $v > ${SUPERMAN_OUTPUT_PATH}/output_o_new/fis_version.txt
    chmod 777 ${SUPERMAN_OUTPUT_PATH}

else
	#wenku
	rm -rf ${WENKU_OUTPUT_PATH}/output_o_old
	cd ${WENKU_CODE_PATH}
	${OLD_FISP_FIS_PATH}/bin/fis release -cd ${WENKU_OUTPUT_PATH}/output_o_old --no-color
	echo $v > ${WENKU_OUTPUT_PATH}/output_o_old/fis_version.txt
    chmod 777 -R ${WENKU_OUTPUT_PATH}/output_o_old	
	
	#tieba
	rm -rf ${TIEBA_OUTPUT_PATH}/output_o_old
	cd ${TIEBA_CODE_PATH}
	${OLD_FISP_FIS_PATH}/bin/fis release -copd ${TIEBA_OUTPUT_PATH}/output_o_old --no-color
	echo $v > ${TIEBA_OUTPUT_PATH}/output_o_old/fis_version.txt
    chmod 777 -R ${TIEBA_OUTPUT_PATH}/output_o_old
	
    #batman
	rm -rf ${BATMAN_OUTPUT_PATH}/output_o_old
	for module in ${BATMAN_MODULES[@]}
	do
		cd ${BATMAN_CODE_PATH}/$module
		fisp release -copd ${BATMAN_OUTPUT_PATH}/output_o_old --no-color
	done
	echo $v > ${BATMAN_OUTPUT_PATH}/output_o_old/fis_version.txt
    chmod 777 -R ${BATMAN_OUTPUT_PATH}/output_o_old

    #place
    rm -rf ${PLACE_OUTPUT_PATH}/output_o_old
    for module in ${PLACE_MODULES[@]}
    do
        cd ${PLACE_CODE_PATH}/$module
        fisp release -copd ${PLACE_OUTPUT_PATH}/output_o_old --no-color
    done
    echo $v > ${PLACE_OUTPUT_PATH}/output_o_old/fis_version.txt
    chmod 777 -R ${PLACE_OUTPUT_PATH}/output_o_old

    #hao123
    rm -rf ${HAO123_OUTPUT_PATH}/output_o_old
    for module in ${HAO123_MODULES[@]}
    do
        cd ${HAO123_CODE_PATH}/$module
        fisp release -copd ${HAO123_OUTPUT_PATH}/output_o_old --no-color
    done
    echo $v > ${HAO123_OUTPUT_PATH}/output_o_old/fis_version.txt
    chmod 777 -R ${HAO123_OUTPUT_PATH}/output_o_old

    #superman
    rm -rf ${SUPERMAN_OUTPUT_PATH}/output_o_old
    for module in ${SUPERMAN_MODULES[@]}
    do
        cd ${SUPERMAN_CODE_PATH}/$module
        fisp release -copd ${SUPERMAN_OUTPUT_PATH}/output_o_old --no-color
    done
    echo $v > ${SUPERMAN_OUTPUT_PATH}/output_o_old/fis_version.txt
    chmod 777 -R ${SUPERMAN_OUTPUT_PATH}/output_o_old

fi
