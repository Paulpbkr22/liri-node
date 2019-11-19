require("dotenv").config();

var keys = require('./keys');
var fs = require("fs");

var axios = require("axios");
var moment = require("moment");

// var spotify = new Spotify(keys.spotify);


var concertSpotifyMovie = process.argv[2];
var userChoice = process.argv.slice(3).join(" ");

switch (concertSpotifyMovie) {

    case "concert-this":
        concertThis()
            break;

    case "spotify-this-song":
        spotifyThis();
            break;

    case "movie-this":
        movieThis();
            break;

    case "do-what-it-says":
        doWhatItSays();
            break;
}

function movieThis() {

    if (!userChoice) {
        userChoice - "Mr. Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }

    axios.get("http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=trilogy").then(function(response) {

        console.log("Title: " + response.data.Title);
        console.log("Released: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country Produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Cast: " + response.data.Actors);
        console.log("------------------------------");
    });
};

function concertThis() {

    if (!userChoice) {
        userChoice = "Disturbed";
    }

    axios.get("https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp").then(function(response) {
       
        console.log("Venue: " + response.data[2].venue.name);
        console.log("Location: " + response.data[2].venue.city + ", " + response.data[2].venue.country);
        console.log("Date: " + moment(response.data[2].datetime).format("MM/DD/YYYY"));
        console.log("------------------------------");
        
    });
};