//set up mysql database
//only holds database information

var Sequelize = require('sequelize');

// THIS IS FOR LOCAL DEV
// var db = new Sequelize('gamemon', 'root', '', {
//   define: {
//     charset: 'utf8mb4'
//   }
// });

// THIS IS FOR THE LIVE SERVER ON HEROKU
var db = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
  define: {
    charset: 'utf8mb4'
  }
});

var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  nickname: {type: Sequelize.STRING, unique: true},
  email: {type: Sequelize.STRING, unique: true},
  imgame: Sequelize.STRING
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
  summary: Sequelize.TEXT,
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
//db.sync(); // Sequelize decides what order to avoid errors

//force the database to update even if there are changes to the schema
//only for development use, other wise comment this out and uncomment the db.sync() above
db.sync({ force: true })
.then(function(err) {
    console.log('It worked!');
  }, function (err) {
         console.log('An error occurred while creating the table:', err);
  });

//export them for use
exports.sequelize = db;
exports.User = User;
exports.Game = Game;
exports.GameLibrary = GameLibrary;
