require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var moment = require('moment');
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var modifiedArray = [];
for (let i = 2; i < process.argv.length; i++) {
    modifiedArray.push(process.argv[i]);
}
var action = modifiedArray[0];
var parameterArray = [];
for (let i = 1; i < modifiedArray.length; i++) {
    parameterArray.push(modifiedArray[i]);
}
var parameter = parameterArray.join("+");
console.log(parameter);


// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
    case "concert-this":
        bands(parameter);
        break;

    case "spotify-this-song":
        songs(keys, Spotify, parameter);
        break;

    case "movie-this":
        movies(parameter);
        break;

    case "do-what-it-says":
        textFile();
        break;
}

// If the "total" function is called...
function bands(parameter) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";
    axios
        .get(queryURL)
        .then(function (response) {
            for (i = 0; i < 10; i++) {
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                console.log("Concert Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            }

        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });


}

// If the "Deposit" function is called...
function songs(keys, Spotify, parameter) {
    if (!parameter) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("");
        console.log("Looks like you didn't pick a song");
        console.log("Lets go with THe Sign by Ace of Base");
        parameter = "The Sign Ace of base";
    }
    var spotify = new Spotify(keys.spotify);
    spotify
        .search({ type: 'track', query: parameter })
        .then(function (data) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("");
            console.log("Track Info:");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("Pretty cool how bout you search for another one");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        })
        .catch(function (err) {
            console.log(err);
        });

}

// If the "Withdraw" function is called
function movies(parameter) {
    if (!parameter) {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: ");
        console.log("Heres a link to IMDB: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
        parameter = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);

    axios
        .get(queryUrl)
        .then(
            function (response) {
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                for (i = 0; i < response.data.Ratings; i++) {
                    console.log(response.data.Ratings[i])
                    // if(response.data.Ratings[i].source === "Rotten Tomatoes"){
                    //     console.log("Rotten Tomatoes Rating: " + response.data.Ratings[i].source.value);
                    // }else{
                    //     console.log("Rotten Tomatoes Rating: N/A");
                    // }
                }
                console.log("Crountry it was produced in: " + response.data.Country);
                console.log("Language it was released in: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}


// If the "Lotto" function is called
function textFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        var randomArray = data.split(",");
        console.log(randomArray);
        var parameterArray = []
        if (randomArray[0] === "spotify-this-song") {
            for (let i = 1; i < randomArray.length; i++) {
                parameterArray.push(randomArray[i]);
            }
            var parameter = parameterArray.join("+");
            console.log(parameter);
            songs(keys, Spotify, parameter);
        }


    });

}

// * `concert-this`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`