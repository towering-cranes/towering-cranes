var request = require('request');

var giantBombApiKey = process.env.GIANTBOMB_API_KEY || 'c8ef1cb935810c3fd06b4fcb5fcb1e9cc684ace3';

exports.searchForGames = function(searchTerm, callback) {
  var options = {
    url: `http://www.giantbomb.com/api/search/?api_key=${giantBombApiKey}&format=json&query="${searchTerm}"&resources=game`,
    headers: {
      'User-Agent': 'gamemon' // Giant Bomb API requires user agent to be filled
    }
  };

  request(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(body).results);
    }
  });
};

exports.getGameById = function(id, callback) {
  var options = {
    url: `http://www.giantbomb.com/api/game/${id}/?api_key=${giantBombApiKey}&format=json&field_list=id,name,aliases,image,images,original_release_date,publishers,developers,deck,description,similar_games,videos,franchises,genres,platforms`,
    headers: {
      'User-Agent': 'gamemon'
    }
  };

  request(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, JSON.parse(body).results);
    }
  });
};
