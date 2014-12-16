#!/home/work/.jumbo/bin/expect

set timeout 480
set p [lindex $argv 0]
set o [lindex $argv 1]
#send_user $s
spawn su - fis -c "sh /home/work/repos/fis/test/util/diff/release$o.sh old"
expect "Password:"
send $p\r
expect eof
exit
