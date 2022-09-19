"use strict"

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const helmet = require("helmet")
const cors = require("cors")

const port = 3200;
const path = require("path");

const userRoutes = require("../src/routes/user.route");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(helmet({}))


app.use("/user", userRoutes);

exports.initServer = () =>
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });