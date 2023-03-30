const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
  })
  .use('/', require('./routes'));

module.exports = app;