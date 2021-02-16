const express = require("express");
const user = express.Router();
const bodyParser = require("body-parser");
const users = require("../schema/user.js");
user.use(bodyParser.json());
user.get("/", (req, res, next) => {
    console.log("Welcome to login page");
})

user.post("/signup", (req, res, next) => {

    users.findOne({ username: req.body.username })
        .then((result) => {
            if (user !== null) {
                const err = new Error("User with username " + result + " already exists!");
                err.status = 403;
                next(err);
            }
            else {
                users.create({ username: req.body.username, password: req.body.password });
            }

        }).then((result) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ status: "Successfully Registered", result: result });
        }, (err) => next(err))

        .catch((err) => next(err));



})

user.post("/login", (req, res, next) => {

    if (!req.session.user) {
        const auth = req.headers.authorization;

        if (!auth) {
            const err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }
        const result = new Buffer.from(auth.split(" ")[1], "base64").toString().split(":");
        const username = result[0];
        const password = result[1];

        users.findOne({ username: username }).then((user) => {
            if (result === null) {
                var err = new Error('User ' + user + ' does not exist!');
                err.status = 403;
                return next(err);
            }
            else if (user.password !== password) {
                var err = new Error('Your password is incorrect!');
                err.status = 403;
                return next(err);
            }
            else if (user.username === username && user.password === password) {
                req.session.user = "authenticated";
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('You are authenticated!');
            }
        })
            .catch((err) => next(err));
    }
    else {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already authenticated!');

    }




})

user.get("/logout", (req, res, next)=>{

    if(req.session){
        req.session.destroy();
        res.clearCookie("SessionId");
        res.redirect('/');
    }
    else{
        var err = new Error('You are not logged in!');
        err.status = 401;
        next(err);
    }



});
module.exports = user;
