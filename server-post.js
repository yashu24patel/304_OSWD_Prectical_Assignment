var http = require('http')
var fs = require('fs')
const url = require('url');

var server = http.createServer(function(req,res){
    console.log("recived url" + req.url);
    var u1 = url.parse(req.url,true);

    if(req.url=="/")
    {
        res.write("hello");
        res.write("hello1");
        res.end();
    }
    else if(req.url=="/list")
    {
        res.write("List");        
        res.end();
    }
    else if(req.url=="/index2.html" && req.method== 'GET')
    {
        var filename = "./index2.html";
        fs.readFile(filename,function(err,data){
            if (err) {
                res.writeHead(404,{'Content-type' : 'text/html'});
                return res.end("404 not found");
            }


            res.writeHead(200,{'Content-type' : 'text/html'});
            res.write(data);
            return res.end();
        });   
    }
    else if(req.url=="/process" && req.method == 'POST')
    {
        let body = '';
        req.on('data', chunk => {
            body+= chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
            res.end("ok => "+body);
        });
    }
    else {
        res.write("other pages");
        res.end();
    }
    
});


server.listen(8080);
console.log("server listing on 8080:");