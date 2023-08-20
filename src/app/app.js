require('express-async-error');
const error = require('../middleware/error.middleware');
const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');

require('../middleware')(app);
require('../middleware/routes')(app);

app.use(error);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));

module.exports = app;
