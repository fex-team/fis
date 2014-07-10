#!/home/work/.jumbo/bin/expect

set timeout 60
set p [lindex $argv 0]
spawn su - fis -c "sh /home/fis/npm/lib/upload.sh"
expect "Password:"
send $p\r
expect "fis@fe's password:"
send $p\r
expect eof
exit
