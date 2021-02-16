const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const user = require("./routes/userRouter.js");
const dishes = require("./routes/dishesRouter.js");
const promotions = require("./routes/promoRouter.js");
const leaders = require("./routes/leadersRouter.js");
const mongoose = require("mongoose");
//const cookieParser = require("cookie-parser");

const session = require("express-session");
const fileStore = require("session-file-store")(session);

app.use(session({
    name: "SessionId",
    secret: "akshatsharma",
    saveUninitialized: false,
    resave: false,
    store: new fileStore()
}));


//app.use(cookieParser("akshatsharma"));
const hostname = "localhost";
const port = 3000;
const url = "mongodb://localhost:27017/first";
app.use(morgan("dev"));
app.use(bodyParser.json());

// function auth(req, res, next){

//     if(!req.signedCookies.user){
//         var auth = req.headers.authorization;

//     if(!auth){
//         var err = new Error("Please enter your authentication details");
//         res.setHeader("WWW-Authenticate", "Basic");
//         err.status = 401;
//         next(err);
//     }

//     var result = new Buffer.from(auth.split(" ")[1], "base64").toString().split(":");

//     var username = result[0];
//     var password = result[1];

//     if(username == "admin" && password == "password"){
//         res.cookie("user", "admin", {signed: true});
//         next();
//     }
//     else{
//         var err = new Error("Please enter correct authentication details");
//         err.status = 401;
//         res.setHeader("WWW-Authenticate", "Basic");
//         next(err);
//     }


//     }
//     else{
//         if(req.signedCookies.user ==="admin"){
//             next();
//         }
//         else
//         {
//             var err = new Error("Please enter correct authentication details");
//             err.status = 401;
//             res.setHeader("WWW-Authenticate", "Basic");
//             next(err);
//         }
//     }


// }

// app.use(auth);
// function auth(req, res, next){
//     console.log(req.session);

//     if(!req.session.user){
//         const auth = req.headers.authorization;

//         if(!auth){
//             const err = new Error("Authorise");
//             res.setHeader("WWW-Authenticate", "Basic");
//             err.status = 401;
//             next(err);
//         }
//         const result = new Buffer.from(auth.split(" ")[1], "base64").toString().split(":");
//         const username = result[0];
//         const password = result[1];

//         if(username == "admin" && password == "password"){
//             req.session.user = "admin";
//             next();
//         }
//         else{
//             const err = new Error("Authorise");
//             res.setHeader("WWW-Authenticate", "Basic");
//             err.status = 401;
//             next(err);
//         }
//     }
//     else{

//         if(req.session.user === "admin"){
//             next();
//         }
//         else{
//             const err = new Error("Authorise");
//             res.setHeader("WWW-Authenticate", "Basic");
//             err.status = 401;
//             next(err);
//         }
//     }

// }
const connect = mongoose.connect(url);
connect.then((result) => {
    console.log("Database connected successfully");

}, (err) => { console.log(err) });


app.use("/user", user);

function auth(req, res, next) {

    if (!req.session.user) {
        var err = new Error('You are not authenticated!');
        err.status = 403;
        return next(err);
    }
    else {
        if (req.session.user === "authenticated") {
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 403;
            return next(err);
        }
    }
}


app.use(auth);



app.use("/dishes", dishes);
app.use("/promotions", promotions);
app.use("/leaders", leaders);



const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



