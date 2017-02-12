var db = require('./db.js');

exports.createUser = function(user, callback) {
  db.User.findOrCreate({where: user}).spread(function(user, created) {
    callback(created);
  });
};

exports.addGameToCollection = function(user, game, callback) {
  db.User.findOne({
    where: {
      username: user
    }
  }).then(function(user) {
    var newGame = {
      giantBombId: game.id,
      title: game.name,
      aliases: game.aliases, // string
      image: game.image.small_url,
      releaseDate: game.original_release_date,
      genres: JSON.stringify(game.genres), // array of objects
      platforms: JSON.stringify(game.platforms),
      franchises: JSON.stringify(game.franchises),
      publishers: JSON.stringify(game.publishers),
      developers: JSON.stringify(game.developers),
      summary: game.deck,
      similarGames: JSON.stringify(game.similar_games),
      videos: JSON.stringify(game.videos)
    };
    db.Game.findOrCreate({where: {title: game.name}, defaults: newGame}).spread(function(game, created) {
      user.addGame(game); // only needs one direction
      callback(created);
    });
  });
};

exports.getGamesFromCollection = function(user, callback) {
  db.sequelize.query(`SELECT Users.username,Games.* FROM Users INNER JOIN GameLibraries ON UserId=Users.id INNER JOIN Games ON GameId=Games.id WHERE Users.username="${user}";`).spread(function(games) {
    games.forEach(function(game) {
      game.genres = JSON.parse(game.genres);
      game.platforms = JSON.parse(game.platforms);
      game.franchises = JSON.parse(game.franchises);
      game.publishers = JSON.parse(game.publishers);
      game.developers = JSON.parse(game.developers);
      game.similarGames = JSON.parse(game.similarGames);
      game.videos = JSON.parse(game.videos);
    })

    callback(games);
  });
};

exports.removeGameFromCollection = function(user, game, callback) {
  // Find user id
  //
  // Find game id
  //
  // Delete user/game's row in GameLibraries
  db.User.findOne({where: {username: user}}).then(function(user) {
    if (user) {
      var userId = user.id;

      db.Game.findOne({where: { title: game }}).then(function(game) {
        if (game) {
          var gameId = game.id;

          db.GameLibrary.destroy({where: { UserId: userId, GameId: gameId }}).then(function(destroyed) {
            callback(destroyed);
          });
        } else {
          callback(game);
        }
      })
    } else { // handle case that user doesn't exist
      callback(user);
    }
  });
};

//Updates user to associate with game title
exports.updateImGameUser = function(user, gameTitle, callback) {
  db.User.findOne({where: {username: user}}).then(function(user) {
    if (user) {
      user.updateAttributes({imgame: gameTitle});
      callback(user);
    } else { // handle case that user doesn't exist
      callback(`${user} doesn't exist or couldn't be found`);
    }
  });
}

//Finds all users associated with game title
exports.findImGameUsers = function(gameTitle, callback) {
  // Find users with same imgame
  db.User.findAll({attributes: { exclude: ['username'] }, where: {imgame: gameTitle}}).then(function(users) {
    if (users) {
      callback(users);
    } else { // handle case that there are no matching users
      callback(null);
    }
  });
}

//Getting user's collection by nickname
exports.getPublicUserCollection = function(nickname, callback) {
  db.sequelize.query(`SELECT Users.nickname,Games.* FROM Users INNER JOIN GameLibraries ON UserId=Users.id INNER JOIN Games ON GameId=Games.id WHERE Users.nickname="${nickname}";`).spread(function(games) {
    games.forEach(function(game) {
      game.genres = JSON.parse(game.genres);
      game.platforms = JSON.parse(game.platforms);
      game.franchises = JSON.parse(game.franchises);
      game.publishers = JSON.parse(game.publishers);
      game.developers = JSON.parse(game.developers);
      game.similarGames = JSON.parse(game.similarGames);
      game.videos = JSON.parse(game.videos);
    });
    callback(games);
  });
};