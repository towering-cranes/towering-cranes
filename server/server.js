var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var db = require('./database/db.js');
var dbHelpers = require('./database/databaseHelpers.js');
var giantBombHelpers = require('./giantBomb/giantBombHelpers.js');

var port = process.env.PORT || 8080;
var app = require('express')();
var server = app.listen(port, function() {
  console.log('Running on port: ', port);
});
app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json({limit: '5mb'}));

////////////////////Socket.io

var connections = [];
var io = require('socket.io')(server);
io.on('connection', function(socket) {
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', function (data) {
    console.log(data);
  });

  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  socket.on('send message', function(data) {
    console.log('wut is data------', data);
    io.sockets.in(data.room).emit('new message', {msg: data.message});
  });

  socket.on('room', function(room) {
    gameroom = room
    socket.join(room, function() {
      io.to('room', 'a new user has joined the room')
    })
    io.sockets.in(room).emit('message', "what's up party people?")
  });

});

//////////////////////////////

// Add a user to db
app.post('/users', function(req, res) {
  var requestObj = req.body;
  var newUser = {
    username: requestObj.username,
    password: requestObj.password,
    nickname: requestObj.nickname,
    email: requestObj.email
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

//Getting all the users associated with a specific game
app.get('/api/users/:gameTitle', function (req, res) {
  var gameTitle = req.params.gameTitle;

  dbHelpers.findImGameUsers(gameTitle, function(users) {
    res.send(users);
  });
});

//Adding a gameTitle to a specific user
app.post('/api/users/:username', function (req, res) {
  var gameTitle = req.body.gameTitle;
  var user = req.params.username;

  dbHelpers.updateImGameUser(user, gameTitle, function(created) {
    if (created) {
      res.send('Game Title added to user');
    } else {
      res.send('User was not updated');
    }
  });
});

app.get('/users/games/:username', function(req, res) {
  var user = req.params.username;

  dbHelpers.getGamesFromCollection(user, function(games) {
    res.send(games);
  })
});

app.get('/api/users/games/public/:nickname', function(req, res) {
  var user = req.params.nickname;

  dbHelpers.getPublicUserCollection(user, function(games) {
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
