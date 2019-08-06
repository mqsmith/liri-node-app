require("dotenv").config();
var fs = require("fs");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
  case "concert-this":
    bands();
    break;

  case "spotify-this-song":
    songs();
    break;

  case "movie-this":
    movies();
    break;

  case "do-what-it-says":
    textFile();
    break;
}

// If the "total" function is called...
function bands() {

}

// If the "Deposit" function is called...
function songs() {

}

// If the "Withdraw" function is called
function movies() {

 
}


// If the "Lotto" function is called
function textFile() {

 
}

// * `concert-this`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`