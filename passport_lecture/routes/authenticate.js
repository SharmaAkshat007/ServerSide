const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const user = require("../schema/user.js");

passport.use(new passportLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
