var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var db = require('../database/db.js');
var app = express();
app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

app.post('/users', function(req, res) {
  var newUser = req.body;
  var makeUser = function(username, password) {
    var user = db.User.build({
      username: username,
      password: password
    });
    user.save().then(function(user) {
      console.log('user created: ', user);
      res.send(user);
    });
  }
  makeUser(newUser.username, newUser.password);
});

app.post('/games', function(req, res) {
  var newGame = req.body;
  var addGame = function(gameObj, username) {
    db.User.findOne({
      where: {
        username: username
      }
    }).then(function(user) {
      var game = gameObj.results;
      var newGame = {
        giantBombId: game.id,
        title: game.name,
        aliases: game.aliases, // string
        image: game.image.super_url,
        releaseDate: game.original_release_date,
        publishers: JSON.stringify(game.publishers[0]), // array of objects
        developers: JSON.stringify(game.developers[0]), // array of objects
        summary: game.deck,
        similarGames: JSON.stringify(game.similar_games[0]), // array of objects
        videos: JSON.stringify(game.videos[0].api_detail_url) // array of objects
      };
      db.Game.findOrCreate({where: newGame}).spread(function(game, created) {
        user.addGame(game);
        game.addUser(user);
        res.send(game);
      });
    })
  };
  addGame(newGame, 'test');
});

var server = app.listen(port, function() {
  console.log('Running on port: ', port);
});


