//set up mysql database
//only holds database information

var Sequelize = require('sequelize');
var db = new Sequelize('gamemon', 'root', '');

var User = db.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

var Game = db.define('Game', {
  giantBombId: Sequelize.INTEGER,
  title: {type: Sequelize.STRING, unique: true},
  aliases: Sequelize.STRING,
  image: Sequelize.STRING,
  images: Sequelize.STRING,
  releaseYear: Sequelize.STRING,
  publishers: Sequelize.STRING,
  developers: Sequelize.STRING,
  summary: Sequelize.STRING,
  fullDescription: Sequelize.STRING,
  similarGames: Sequelize.STRING,
  videos: Sequelize.STRING
});


var Franchise = db.define('Franchise', {
  franchise: {type: Sequelize.STRING, unique: true}
});

var Platform = db.define('Platform', {
  platform: {type: Sequelize.STRING, unique: true}
});

var Genre = db.define('Genre', {
  genre: {type: Sequelize.STRING, unique: true}
});

//creating a GameLibrary join table to holding users and games
User.belongsToMany(Game, {through: 'GameLibrary'});
Game.belongsToMany(User, {through: 'GameLibrary'});


//one to many relationship between franchise and game
// Game.hasOne(Franchise);
Franchise.belongsTo(Game);
// Franchise.hasMany(Game);

//create a join table for games and platforms

// Game.belongsToMany(Platform, {through: 'GamePlatform'});
// Platform.belongsToMany(Game, {through: 'GamePlatform'});

//create a join table for games and genres

// Game.belongsToMany(Genre, {through: 'GameGenre'});
// Genre.belongsToMany(Game, {through: 'GameGenre'});

//creates tables in mysql if they don't exist
User.sync({force: true});
Game.sync({force: true});
Franchise.sync({force: true});
Platform.sync({force: true});
Genre.sync({force: true});

//export them for use

exports.User = User;
exports.Game = Game;
exports.Franchise = Franchise;
exports.Platform = Platform;
exports.Genre = Genre;


