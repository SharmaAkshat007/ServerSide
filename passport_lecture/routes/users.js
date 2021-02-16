const passport = require("passport");
const express = require("express");
const user = require("../schema/user.js");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());


router.post("/", (req, res, next) => {
    user.register(new user({ username: req.body.username }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            }
            else {
                passport.authenticate("local")(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: 'Registration Successful!' });
                })
            }
        }
    );

});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'You are successfully logged in!' });
});

router.get("/logout", (req, res , next)=>{
    if(user.session){
        req.session.destroy();
        res.clearCookie("SessionId");
        res.redirect("/");
    }
});