const http = require("http");

const fs = require("fs");

const path = require("path");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    console.log("Getting request for " + req.url + " and by method " + req.method);

    if (req.method == "GET") {
        var fileUrl;
        if (req.url == "/") fileUrl = "/index.html";
        else {fileUrl = req.url;}

        var filePath = path.resolve("./public" + fileUrl);
        var fileExt = path.extname(filePath);

        if (fileExt == ".html") {
            fs.exists(filePath, (exists)=>{
                if(!exists){
                    res.statusCode = 404;
                    res.setHeader("Content-Type", "text/html");
                    res.end(`<html><body><h1>Error: ${res.statusCode} file does not exists</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/html");
            res.end(`<html><body><h1>Error: ${res.statusCode} file is not .html file</h1></body></html>`);
        }


    }
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(`<html><body><h1>Error: ${res.statusCode} only have get as a method</h1></body></html>`);
    }
});

server.listen(port, hostname, ()=>{
    console.log(`Server at :  http://${hostname}:${port}`)
});