require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

// use the client
app.use(express.static('../client/build'))

// console log the fired requests
function logger(req, res, next) {
    console.log(`request fired ${req.url} ${req.method}`);
    next();
  }
app.use(logger);

// find the data with the request path
app.use('/api', require('./api'));

// network error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}
app.use(errorHandler)

// unknown endpoint handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

module.exports = app;