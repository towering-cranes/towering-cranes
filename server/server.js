var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var db = require('./database/db.js');
var dbHelpers = require('./database/databaseHelpers.js');
var giantBombHelpers = require('./giantBomb/giantBombHelpers.js');
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

  dbHelpers.createUser(newUser, function(created) {
    if (created) {
      res.send('User created');
    } else {
      res.send('User already exists');
    }
  });
});

// Add game to collection and database if game isn't in db
app.post('/games', function(req, res) {
  var newGame = req.body;
  var user = req.body.username;
  var game = req.body;

  dbHelpers.addGameToCollection(user, game, function(created) {
    if (created) {
      res.send('New game added to database');
    } else {
      res.send('Game already exists');
    }
  });
});

app.get('/users/games/:username', function(req, res) {
  var user = req.params.username;

  dbHelpers.getGamesFromCollection(user, function(games) {
    res.send(games);
  })
});

// Remove game from user's collection
app.delete('/games', function(req, res) {
  var gameTitle = req.body.name;
  var user = req.body.username;
  // Delete game from database
  dbHelpers.removeGameFromCollection(user, gameTitle, function(destroyed) {
    if (destroyed) {
      res.send('Game was removed from collection');
    } else {
      res.send('No game was removed from the collection');
    }
  });
});

// // Filter by game's genre
// app.get('/games/genre', function(req, res) {
//   var genre = req.body.genre;
//   var user = req.body.username;
//   // Filter user's game by genre
// });

// app.get('/games/platform', function(req, res) {
//   var platform = req.body.platform;
//   var user = req.body.username;
//   //Filter user games by platform
// });

app.get('/games/search/keyword/:keyword', function(req, res) {
  var keyword = req.params.keyword;

  giantBombHelpers.searchForGames(keyword, function(err, games) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json(games);
    }
  });
});

app.get('/games/search/id/:id', function(req, res) {
  var id = req.params.id;

  giantBombHelpers.getGameById(id, function(err, game) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json(game);
    }
  });
});

var server = app.listen(port, function() {
  console.log('Running on port: ', port);
});
