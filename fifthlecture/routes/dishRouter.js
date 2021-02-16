const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route("/:")
.all((req, res, next)=>{
    res.statusCode =200;
    res.setHeader("Content-Type", "text/plain");
    next();
})
.get((req, res, next)=>{
    res.end("i am in get");
})

.post( (req, res, next)=>{
    res.statusCode =200;
    res.end(`I am in post ${req.body.name} ${req.body.description}`);
})
.put((req, res, next)=>{
    res.statusCode = 403;
    res.end("PUT operation is not available for /dish");
})

.delete( (req, res, next)=>{
    res.end("Will delete");
})



.all((req, res, next)=>{
    res.statusCode =200;
    res.setHeader("Content-Type", "text/plain");
    next();
})
.get((req, res, next)=>{
    res.end("i am in get id");
})

.post( (req, res, next)=>{
    res.statusCode =200;
    res.end(`I am in post ${req.body.name} ${req.body.description} id`);
})
.put((req, res, next)=>{
    res.statusCode = 403;
    res.end("PUT operation is not available for /dish id");
})

.delete( (req, res, next)=>{
    res.end("Will delete id");
});

module.exports.dishRouter = dishRouter;
