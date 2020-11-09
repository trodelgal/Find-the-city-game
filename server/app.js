require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
 app.use(express.static('../client/build'))

function logger(req, res, next) {
    console.log(`request fired ${req.url} ${req.method}`);
    next();
  }

  app.use(logger);

app.use('/api', require('./api'));

module.exports = app;