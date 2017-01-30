// exports.makeUser = function(username, password) {
//   var user = User.build({
//     username: username,
//     password: password
//   });
//   user.save().then(function(user) {
//     console.log('user created: ', user);
//   });
// }

// exports.addGame = function(gameObj, username) {
//   User.findOne({
//     where: {
//       username: username
//     }
//   }).then(function(user) {
//     var game = gameObj.results;
//     var newGame = Game.build({
//       giantBombId: game.id,
//       title: game.name,
//       aliases: game.aliases, // string
//       image: game.image.super_url,
//       releaseDate: game.original_release_date,
//       publishers: game.publishers, // array of objects
//       developers: game.developers, // array of objects
//       summary: game.deck,
//       similarGames: game.similar_games, // array of objects
//       videos: game.videos
//     });
//     newGame.save().then(function(game) {
//       user.addGame(game);
//       game.addUser(user);
//     });
//   })
// };

// var testUser = {
//   username: 'test',
//   password: 'password'
// };

// console.log(JSON.stringify(testUser));


// var blah = function(gameObj) {
//   var game = gameObj.results;
//   return {
//     giantBombId: game.id,
//     title: game.name,
//     aliases: game.aliases, // string
//     image: game.image.super_url,
//     releaseDate: game.original_release_date,
//     publishers: game.publishers, // array of objects
//     developers: game.developers, // array of objects
//     summary: game.deck,
//     similarGames: game.similar_games, // array of objects
//     videos: game.videos
//   };
// };

var testData = {
  "error": "OK",
  "limit": 1,
  "offset": 0,
  "number_of_page_results": 1,
  "number_of_total_results": 1,
  "status_code": 1,
  "results": {
    "aliases": "mp",
    "deck": "Take control of Samus Aran in her first 3D adventure as she battles the Space Pirates on Tallon IV while uncovering the mysterious disappearance of its inhabitants.",
    "id": 15473,
    "image": {
      "icon_url": "http://www.giantbomb.com/api/image/square_avatar/2550128-primeclean.jpg",
      "medium_url": "http://www.giantbomb.com/api/image/scale_medium/2550128-primeclean.jpg",
      "screen_url": "http://www.giantbomb.com/api/image/screen_medium/2550128-primeclean.jpg",
      "small_url": "http://www.giantbomb.com/api/image/scale_small/2550128-primeclean.jpg",
      "super_url": "http://www.giantbomb.com/api/image/scale_large/2550128-primeclean.jpg",
      "thumb_url": "http://www.giantbomb.com/api/image/scale_avatar/2550128-primeclean.jpg",
      "tiny_url": "http://www.giantbomb.com/api/image/square_mini/2550128-primeclean.jpg"
    },
    "name": "Metroid Prime",
    "original_release_date": "2002-11-18 00:00:00",
    "platforms": [{
      "api_detail_url": "http://www.giantbomb.com/api/platform/3045-23/",
      "id": 23,
      "name": "GameCube",
      "site_detail_url": "http://www.giantbomb.com/gamecube/3045-23/",
      "abbreviation": "GCN"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/platform/3045-36/",
      "id": 36,
      "name": "Wii",
      "site_detail_url": "http://www.giantbomb.com/wii/3045-36/",
      "abbreviation": "Wii"
    }],
    "videos": [{
      "api_detail_url": "http://www.giantbomb.com/api/video/2300-11018/",
      "id": 11018,
      "name": "Game Tapes Raw: Nintendo Space World 2001 GameCube B-roll (08/18/2001)",
      "site_detail_url": "http://www.giantbomb.com/videos/game-tapes-raw-nintendo-space-world-2001-gamecube-/2300-11018/"
    }],
    "developers": [{
      "api_detail_url": "http://www.giantbomb.com/api/company/3010-1507/",
      "id": 1507,
      "name": "Retro Studios",
      "site_detail_url": "http://www.giantbomb.com/retro-studios/3010-1507/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/company/3010-928/",
      "id": 928,
      "name": "Nintendo R&D1",
      "site_detail_url": "http://www.giantbomb.com/nintendo-rd1/3010-928/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/company/3010-463/",
      "id": 463,
      "name": "Nintendo EAD",
      "site_detail_url": "http://www.giantbomb.com/nintendo-ead/3010-463/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/company/3010-9450/",
      "id": 9450,
      "name": "Nintendo SPD Group No.3",
      "site_detail_url": "http://www.giantbomb.com/nintendo-spd-group-no3/3010-9450/"
    }],
    "franchises": [{
      "api_detail_url": "http://www.giantbomb.com/api/franchise/3025-3/",
      "id": 3,
      "name": "Metroid",
      "site_detail_url": "http://www.giantbomb.com/metroid/3025-3/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/franchise/3025-1197/",
      "id": 1197,
      "name": "New Play Control",
      "site_detail_url": "http://www.giantbomb.com/new-play-control/3025-1197/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/franchise/3025-1319/",
      "id": 1319,
      "name": "Metroid Prime",
      "site_detail_url": "http://www.giantbomb.com/metroid-prime/3025-1319/"
    }],
    "genres": [{
      "api_detail_url": "http://www.giantbomb.com/api/genre/3060-32/",
      "id": 32,
      "name": "First-Person Shooter",
      "site_detail_url": "http://www.giantbomb.com/games/?wikiSlug=first-person-shooter&wikiTypeId=3060&wikiId=32&genre=32"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/genre/3060-41/",
      "id": 41,
      "name": "Platformer",
      "site_detail_url": "http://www.giantbomb.com/games/?wikiSlug=platformer&wikiTypeId=3060&wikiId=41&genre=41"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/genre/3060-43/",
      "id": 43,
      "name": "Action-Adventure",
      "site_detail_url": "http://www.giantbomb.com/games/?wikiSlug=action-adventure&wikiTypeId=3060&wikiId=43&genre=43"
    }],
    "publishers": [{
      "api_detail_url": "http://www.giantbomb.com/api/publisher/3010-90/",
      "id": 90,
      "name": "Nintendo",
      "site_detail_url": "http://www.giantbomb.com/nintendo/3010-90/"
    }],
    "similar_games": [{
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-17280/",
      "id": 17280,
      "name": "BioShock",
      "site_detail_url": "http://www.giantbomb.com/bioshock/3030-17280/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-19801/",
      "id": 19801,
      "name": "Mega Man X2",
      "site_detail_url": "http://www.giantbomb.com/mega-man-x2/3030-19801/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-20333/",
      "id": 20333,
      "name": "Geist",
      "site_detail_url": "http://www.giantbomb.com/geist/3030-20333/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-16372/",
      "id": 16372,
      "name": "Prey",
      "site_detail_url": "http://www.giantbomb.com/prey/3030-16372/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-26706/",
      "id": 26706,
      "name": "Shadow Complex",
      "site_detail_url": "http://www.giantbomb.com/shadow-complex/3030-26706/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-14216/",
      "id": 14216,
      "name": "Castlevania: Symphony of the Night",
      "site_detail_url": "http://www.giantbomb.com/castlevania-symphony-of-the-night/3030-14216/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-1339/",
      "id": 1339,
      "name": "Star Wars: Republic Commando",
      "site_detail_url": "http://www.giantbomb.com/star-wars-republic-commando/3030-1339/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-45724/",
      "id": 45724,
      "name": "Sync",
      "site_detail_url": "http://www.giantbomb.com/sync/3030-45724/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-47161/",
      "id": 47161,
      "name": "The Divide: Enemies Within",
      "site_detail_url": "http://www.giantbomb.com/the-divide-enemies-within/3030-47161/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-23289/",
      "id": 23289,
      "name": "Robotica",
      "site_detail_url": "http://www.giantbomb.com/robotica/3030-23289/"
    }, {
      "api_detail_url": "http://www.giantbomb.com/api/game/3030-20654/",
      "id": 20654,
      "name": "Doom",
      "site_detail_url": "http://www.giantbomb.com/doom/3030-20654/"
    }]
  },
  "version": "0"
}

console.log(JSON.stringify(testData));