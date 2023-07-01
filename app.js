var express = require('express');
var logger = require('morgan');
let cors = require('cors')

var app = express();

logger.token('id', function getId(req) {
  return req.id
});

logger.token('req', function (req) {
  return JSON.stringify(req.body)
});

let loggerFormat = 'Logger -- :id [:date[web]] ":method :url" :status :response-time :req ';

app.enable("trust proxy");

app.use(cors());

app.use(logger(loggerFormat, {
  skip: function (req, res) {
    return res.statusCode < 400
  },
  stream: process.stdout
}));

app.use(logger(loggerFormat, {
  skip: function (req, res) {
    return res.statusCode >= 400
  },
  stream: process.stderr
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("", require('./routes'));

app.use((req, res, next) => {
  console.log("check 404")
  const error = new Error('Not found');
  error.status = 404;
  next(error)
})

app.use((error, req, res, next) => {
  console.log("check 500", error)
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;