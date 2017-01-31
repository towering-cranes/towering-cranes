//set up mysql database
//only holds database information

var Sequelize = require('sequelize');
var db = new Sequelize('gamemon', 'root', process.env.DB_PASSWORD);

var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING
});

var Game = db.define('Game', {
  giantBombId: Sequelize.INTEGER,
  title: {type: Sequelize.STRING, unique: true},
  aliases: Sequelize.STRING,
  image: Sequelize.STRING,
  releaseDate: Sequelize.DATE,
  genres: Sequelize.TEXT, // long JSON
  platforms: Sequelize.TEXT,
  franchises: Sequelize.TEXT,
  publishers: Sequelize.TEXT,
  developers: Sequelize.TEXT,
  summary: Sequelize.STRING,
  similarGames: Sequelize.TEXT,
  videos: Sequelize.TEXT
});

var GameLibrary = db.define('GameLibrary', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

//creating a GameLibrary join table to holding users and games
User.belongsToMany(Game, {through: 'GameLibrary'});
Game.belongsToMany(User, {through: 'GameLibrary'});

// creates tables in mysql if they don't exist
db.sync(); // Sequelize decides what order to avoid errors

//export them for use
exports.sequelize = db;
exports.User = User;
exports.Game = Game;
exports.GameLibrary = GameLibrary;
