// require all of the node packages
require("dotenv").config();
const keys = require("./keys.js");
const rq = require("request");
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

// link the input to the node command line
const command = process.argv[2];

// key commands for requests
if (command === 'my-tweets') {
    getTweets();
}

if (command === 'spotify-this-song') {
    spotifySong();
}

if (command === 'movie-this') {
    movieInfo();
}

if (command === 'do-what-it-says') {
    whatItSays();
}

//------------------------------------------ twitter requests


function getTweets() {
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

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

function spotifySong() {

    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    spotify.search({ 
        type: 'track', 
        query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console log the artist of the song
        console.log(data.tracks.items[0].album.artists[0].name);
        // // console log the songs name
        console.log(data.tracks.items[0].name);
        // console log the preview link of the song from spotify
        console.log(data.tracks.items[0].artists[0].href);
        // console log the album name
        console.log(data.tracks.items[0].album.name);
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