const express = require("express")
const app = express()
const userRouter = require("../routes/users");
const fruitsRouter = require("../routes/fruits");

app.use("/users", userRouter);
app.use("/fruits", fruitsRouter);

module.exports = app;