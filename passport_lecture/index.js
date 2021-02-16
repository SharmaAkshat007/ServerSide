const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const app = express();
const mongoose = require("mongoose");
const authenticate = require("./routes/authenticate");
const usersRouter = require("./routes/users");
const session = require("express-session");
const fileStore = require("session-file-store")(session);


app.use(bodyParser.json());

const hostname = "localhost";
const port = 3000;
const url = "mongodb://localhost:27017/first";
app.use(morgan("dev"));
app.use(bodyParser.json());


const connect = mongoose.connect(url);
connect.then((result) => {
    console.log("Database connected successfully");

}, (err) => { console.log(err) });



app.use(session({
    name: "SessionId",
    secret: "akshatsharma",
    saveUninitialized: false,
    resave: false,
    store: new fileStore()
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", usersRouter);
function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
          next();
    }
}

app.use(auth);

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



