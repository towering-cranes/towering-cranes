var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json());
var port = process.env.PORT || 8000;

var server = app.listen(port, function() {
  console.log('Running on port: ', port);
});


