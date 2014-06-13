#!/bin/sh
echo `pwd` | grep -q "jello"
if [ $? -eq 0 ]; then {
        jello release -m
        root="/root/.jello-tmp/www"
}
fi
echo `pwd` | grep -q "pc-demo"
if [ $? -eq 0 ]; then {
        if [ ! -d "./home" ]; then {
                echo "can't find home!"
                exit
        }
        fi
        if [ ! -d "./common" ]; then {
                echo "can't find common!"
                exit
        }
        fi
        cd ./home
        fis release -m
        cd ../common
        fis release -m
 	    cd ..
        root="/root/.fis-tmp/www"
}
fi
if [ -z "$root" ]; then {
        echo "can't find project!"
        exit;
}
fi
if [ ! -d  "$root" ]; then {
        echo "$root file not exist!";
        exit 1;
}
fi
touch exchange.txt
echo "$root">exchange.txt
php tstRight.php
rm exchange.txt
if [  -f  "${root}/exchange.txt" ]; then {
        rm ${root}/exchange.txt
}
fi
