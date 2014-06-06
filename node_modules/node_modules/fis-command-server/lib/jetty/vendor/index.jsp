<%@ page contentType="text/html; charset=utf-8" %>

<% if(request.getRequestURI().equals("/favicon.ico")){
    response.reset();
    response.setContentType("image/x-icon");
    java.io.FileInputStream fis = new java.io.FileInputStream(application.getRealPath("/favicon.ico"));
    java.io.OutputStream os = response.getOutputStream();
    byte[] buf = new byte[4096];
    int bytes = 0;
    while ((bytes = fis.read(buf)) != -1) os.write(buf, 0, bytes);
    fis.close();
    os.flush();
} else { %>

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
                                             Forward request <em class="c1">" <%=request.getRequestURI()%> "</em> to file [ <em class="c2"><%=application.getRealPath("index.jsp")%></em> ].
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

<% } %>