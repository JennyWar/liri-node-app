// require all of the node packages
require("dotenv").config();
const rq = require("request");

// link the input to the node command line
const command = process.argv[2];

// link this file to the keys.js file
const keys = require("./keys.js");

//------------------------------------------ twitter requests
// link to twitter node package
const Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// When entering `my-tweets`, return my 20 tweets

if (command === 'my-tweets') {
    getTweets();
}

function getTweets() {

    var params = {
        screen_name: 'jennywar222'
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text); // shows the last 20 tweets
            console.log(tweets[i].created_at); // shows the date the tweet was created
        }

    });
}

// ------------------------------------------------ spotify requests
// When entering `spotify-this-song`, return the song entered

if (command === 'spotify-this-song') {
    spotifySong();
}

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});



function spotifySong() {

    // search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}

// ------------------------------------------------- OMBD requests
// When entering `movie-this`, return the movies information for:
//  * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.



// ------------------------------------- do what it says requests;