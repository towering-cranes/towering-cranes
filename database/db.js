//set up mysql database
//only holds database information

var Sequelize = require('sequelize');
var db = new Sequelize('gamemon', 'root', '');
var User = db.define(User, {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var GameLibrary = db.define(GameLibrary, {});

var Game = db.define(Game, {
  giantBombId: Sequelize.INTEGER,
  title: Sequelize.STRING,
  aliases: Sequelize.STRING,
  image: Sequelize.STRING,
  images: Sequelize.STRING,
  releaseYear: Sequelize.STRING,
  publishers: Sequelize.STRING,
  developers: Sequelize.STRING,
  summary: Sequelize.STRING,
  fullDescription: Sequelize.STRING,
  similarGames: Sequelize.STRING,
  videos: Sequelize.STRING,
  reviews: Sequelize.STRING
});

var Franchise = db.define(Franchise, {
  franchise: Sequelize.STRING
});

GameLibrary.belongsTo(User);
User.hasOne(GameLibrary);
Game.belongsTo(GameLibrary);
Game.hasOne(Franchise);
