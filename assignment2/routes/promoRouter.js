const mongoose = require("mongoose");
const express = require("express");
const promotions = require("../schema/promotions.js");
const bodyParser = require("body-parser");
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route("/")
.get((req, res, next)=>{
    promotions.find({}).then((promo)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promo);
    }, (err)=>next(err))
    .catch((err)=>next(err));
})
.post((req, res, next)=>{
    promotions.create(req.body).then((promo)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promo);
    }, (err)=>next(err))
    .catch((err)=>next(err));
})
.put((req, res, next)=>{
    
    res.statusCode = 403;    
    res.end("PUT operation is supported on /promotions");
})
.delete((req, res, next)=>{
    promotions.remove({}).then((promo)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promo);
    }, (err)=>next(err))
    .catch((err)=>next(err));
});


promoRouter.route("/:promoId")
.get((req, res, next)=>{
    promotions.findById(req.params.promoId).then((promo)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promo);
    }, (err)=>next(err))
    .catch((err)=>next(err));
})
.post((req, res, next)=>{
    res.statusCode = 403;    
    res.end("POST operation is not supported on /promotions/"+req.params.promoId);
})
.put((req, res, next)=>{
    promotions.findByIdAndUpdate(req.params.promoId, {$set: req.body}, {new:true}).then((promo)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promo);
    }, (err)=>next(err))
    .catch((err)=>next(err));
})
.delete((req, res, next)=>{
    promotions.findByIdAndRemove(req.params.promoId).then((promo)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promo);
    }, (err)=>next(err))
    .catch((err)=>next(err));
})
module.exports = promoRouter;