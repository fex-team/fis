<?php if($_SERVER['REQUEST_URI'] == '/favicon.ico'){
    header('Content-Type: image/x-icon');
    echo file_get_contents(dirname(__FILE__) . '/favicon.ico');
} else {?>
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>hello, fis</title>
<style>
    pre {
        line-height: 7px;
        font-family: "Courier New", "Courier", "monospace", "Consolas", "DejaVu Sans Mono";
        font-size: 11px;
        color: #333;
        border-bottom: 1px dashed #999;
        padding-bottom: 1px;
    }
    .c1 {
        color: #c00;
    }
    .c2 {
        color: #03c;
    }
</style>
</head>
<body>
  
<pre>          ;;;.                    
          @@@'                    
          @@@+                    
    @@ ;@@@@@@@@`.@.   '` @       
   @@@@@@@@@@@@@@@@@.  @@@@;      
   @@@@@@@@@@@@@@@@@@,@@. #@@     
    @@@@@@@@@@@@@@@@ `@'   @#     
   +@@@@@     ;@@@@@` @;   @@     
   @@@@@       `@@@@@:@@  '@@     
  .@@@@         +@@@@  @@@@#      
+@@@@@@          @@@@@@+#,@.      
+@@@@@+          @@@@@@ :.  @@    
+@@@@@#          @@@@@@ @@@@@@`   
;@@@@@@          @@@@@@.@@@@@@@'+ 
  .@@@@         #@@@@ .@@@  `@@@@ 
   @@@@@       ,@@@@@+@@@     @@: 
   +@@@@@,    #@@@@@ .@@#     @@@ 
   :@@@@@@@@@@@@@@@@  @@#     @@@,
  .@@@@@@@@@@@@@@@@@@ ;@@     @@@.
   +@@@@@@@@@@@@@@@@  @@@@. ,@@@  
    +# :@@@@@@@@` @   #.@@@@@@@`  
          @@@+           @@@@@@   
          @@@+           @@  :    
                                             Forward request <em class="c1">" <?php echo $_SERVER['REQUEST_URI'];?> "</em> to file [ <em class="c2"><?php echo __FILE__;?></em> ].
  @@@@@@@      @@@@`     @@@@@@@  
  @@@@@@@      @@@@`     @@@@@@@  
  @@            +@       @@       
  @@@@@@        +@       @@@@@@@  
  @@@@@@        +@       @@@@@@@  
  @@            +@            `@  
  @@       @@  @@@@` :@  @@@@@@@  
  @@       @@  @@@@` :@  @@@@@@@  
                                  
                                  
</pre>

</body>
</html>

<?php }