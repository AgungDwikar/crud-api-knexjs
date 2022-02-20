const express = require("express");
const app = express();
const methodOverride = require("method-override");
const indexRouter = require("./router");
const bodyParser = require('body-parser')

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(methodOverride("_method"));
app.use("/", indexRouter);

app.listen(3000, function () {
    console.log("server running on port 3000");
});
