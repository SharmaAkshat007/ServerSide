const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const leaders = require("../schema/leaders.js");
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route("/")
.get((req, res , next)=>{

    leaders.find({}).then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }, (err)=> next(err))
    .catch((err)=>next(err));
})
.post((req, res , next)=>{
    leaders.create(req.body).then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }, (err)=> next(err))
    .catch((err)=>next(err));
})
.put((req, res , next)=>{
    res.statusCode = 403;    
    res.end("PUT operation is supported on /leaders");
})
.delete((req, res , next)=>{
    leaders.remove({}).then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }, (err)=> next(err))
    .catch((err)=>next(err));
})


leaderRouter.route("/:leaderId")
.get((req, res , next)=>{
    leaders.findById(req.params.leaderId).then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }, (err)=> next(err))
    .catch((err)=>next(err));
})
.post((req, res , next)=>{
    res.statusCode =403;
    res.end("POST operation is not supported on /promotions/"+req.params.leaderId);
})
.put((req, res , next)=>{
    leaders.findByIdAndUpdate(req.params.leaderId, {$set: req.body}, {new:true}).then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }, (err)=> next(err))
    .catch((err)=>next(err));
})
.delete((req, res , next)=>{
    leaders.findByIdAndRemove(req.params.leaderId).then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    }, (err)=> next(err))
    .catch((err)=>next(err));
})

module.exports = leaderRouter;