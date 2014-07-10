#!/usr/bin/env bash

TEST_PATH=/home/work/repos/fis/test/util/diff
cd  ${TEST_PATH}
if [ -f "result"$4"/report.xml" ]
then
   rm "result"$4"/report.xml"
fi
sh product_code.sh $1 $2
sh new_fis_ready.sh $4
chmod +x old_fis_scp.sh
./old_fis_scp.sh $3
chmod +x old_fis_ready.sh
./old_fis_ready.sh $3 $4
rm -rf result$4/*.html
sleep 2s
php -f diffall.class.php $4
