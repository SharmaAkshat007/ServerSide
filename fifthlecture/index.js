const http = require("http");
const express = require("express");
const morgan =require("morgan");
const bodyParser = require("body-parser");


const hostname ="localhost";
const port = 3000;
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

const dishRouter = require("./routes/dishRouter.js");

app.use("/dishes/:dishId", dishRouter.dishRouter);

app.use(express.static("public"));

app.use((req, res, next)=>{

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("The server is running perfectly");
});

const server = http.createServer(app);
server.listen(port, hostname, ()=>{
    console.log(`Server is running at http://${hostname}:${port}`);
});