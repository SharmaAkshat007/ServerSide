const http = require("http");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

const dishRouter = require("./routes/dishRouter.js");
const promoRouter = require("./routes/promoRouter.js");
const leaderRouter = require("./routes/leaderRouter.js");
app.use("/dishes", dishRouter.dishRouter);
app.use("/promotions", promoRouter.promoRouter);
app.use("/leaders", leaderRouter.leaderRouter);
const server = http.createServer(app);

server.listen(port, hostname, ()=>{
    console.log(`Server is running at : http://${hostname}:${port}`);
});