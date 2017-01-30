var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var db = require('../database/db.js');
var app = express();
app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

// Add a user to db
app.post('/users', function(req, res) {
  var requestObj = req.body;
  var newUser = {
    username: requestObj.username,
    password: requestObj.password
  };
  db.User.findOrCreate({where: newUser}).spread(function(user, created) {
    if (created) {
      console.log('user created: ', user);
      res.send('***User created!***');
    } else {
      res.send('User already exists!!!')
    }
  });
});

// Add game to collection and database if game isn't in db
app.post('/games', function(req, res) {
  var newGame = req.body;
  var addGame = function(gameObj) {
    db.User.findOne({
      where: {
        username: gameObj.username
      }
    }).then(function(user) {
      var game = gameObj.results;
      var newGame = {
        giantBombId: game.id,
        title: game.name,
        aliases: game.aliases, // string
        image: game.image.super_url,
        releaseDate: game.original_release_date,
        publishers: JSON.stringify(game.publishers), // array of objects
        developers: JSON.stringify(game.developers), // array of objects
        summary: game.deck,
        similarGames: JSON.stringify(game.similar_games), // array of objects
        videos: JSON.stringify(game.videos.api_detail_url) // array of objects
      };
      db.Game.findOrCreate({where: newGame}).spread(function(game, created) {
          user.addGame(game); // only needs one direction
        if (created) {
          res.send('***ADDED TO DB***');
        } else {
          res.send('ALREADY IN DB');
        }
      });
    });
  };
  addGame(newGame);
});

// Remove game from user's collection
app.delete('/games', function(req, res) {
  var game = req.body.results;
  var user = req.body.username;
  // Delete game from database
});

// Filter by game's genre
app.get('/games/genre', function(req, res) {
  var genre = req.body.genre;
  var user = req.body.username;
  // Filter user's game by genre
});

app.get('/games/platform', function(req, res) {
  var platform = req.body.platform;
  var user = req.body.username;
  //Filter user games by platform
});

app.get('/games/search', function(req, res) {
  var keyword = req.body.keyword;

  //Search Giant Bomb API by keyword
});

var server = app.listen(port, function() {
  console.log('Running on port: ', port);
});
