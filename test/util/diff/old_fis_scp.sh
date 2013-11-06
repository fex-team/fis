#!/home/work/.jumbo/bin/expect

set timeout 60
spawn su - fis -c "sh /home/fis/npm/lib/upload.sh"
expect "Password:"
send cqmyg123\r
expect "fis@fe's password:"
send cqmyg123\r
expect eof
exit
