var db = require('../../database/db.js');

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
      image: game.image.super_url,
      releaseDate: game.original_release_date,
      publishers: JSON.stringify(game.publishers), // array of objects
      developers: JSON.stringify(game.developers), // array of objects
      summary: game.deck,
      similarGames: JSON.stringify(game.similar_games), // array of objects
      videos: JSON.stringify(game.videos.api_detail_url) // array of objects
    };
    db.Game.findOrCreate({where: {title: game.name}, defaults: newGame}).spread(function(game, created) {
      user.addGame(game); // only needs one direction
      callback(created);
    });
  });
};
