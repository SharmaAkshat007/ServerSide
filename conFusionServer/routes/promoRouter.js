const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();
const promoRouterId = express.Router();
promoRouter.use(bodyParser.json());
promoRouterId.use(bodyParser.json());
promoRouter.route("/")
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","text/plain");
    next();
})
.get((req, res, next)=>{
    res.end("Will send all promotions to you");
})
.post((req, res, next)=>{
   
    res.end(`Will add all the promotion: ${req.body.test} with details: ${req.body.description}`);
    

})
.put((req, res, next)=>{
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
})
.delete((req, res, next)=>{
    res.end("Will delete all promotions");
});

promoRouterId.route("/")
.all((req, res, next) => {
    // console.log(req.params.dishId && 'true');
     res.statusCode = 200;
     res.setHeader("Content-Type", "text/plain");
     next();
 })
 .get((req, res, next) => {
     res.end('Will send details of the promotions: ' + req.params.promoId + ' to you!');
 })

 .post((req, res, next) => {
     res.statusCode = 403;
     res.end('POST operation not supported on /promotions/' + req.params.promoId);
 })

 .put((req, res, next) => {
     res.write('Updating the promotions: ' + req.params.promoId + '\n');
     res.end('Will update the promotions: ' + req.body.name +
         ' with details: ' + req.body.description);
 })

 .delete((req, res, next) => {
     res.end('Deleting promotions: ' + req.params.promoId);
 });
module.exports.promoRouter = promoRouter;
module.exports.promoRouterId = promoRouterId;