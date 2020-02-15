require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var action = process.argv[2];
var value = process.argv[3]; 
value = process.argv.slice(3).join(" ");

switch (action) {
case "concert-this":
    concert();
  break;

case "spotify-this-song":
    spotifyRun();
  break;

case "movie-this":
    movie();
  break;

case "do-what-it-says":
    dowhat();
  break;
}
function concert(){
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
        function(response) {
          for (var i=0; i<response.data.length; i++){
              
              var venueName = response.data[i].venue.name;
              var city = response.data[i].venue.city;
              var eventDate = response.data[i].datetime;
              eventDate = moment(eventDate, 'YYYY-MM-DD').format('MM/DD/YYYY');
              console.log("\nVenue: " +venueName+ ",","City: "+ city+ ",","Date: " +eventDate)
          }
          

        }
      )

}
function spotifyRun(){
  if (!value) {
    value = "The Sign";
  }
  spotify.search({ type: 'track', query: value }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var artist = data.tracks.items[0].artists[0].name;
    var songName = data.tracks.items[0].name
    var link = data.tracks.items[0].external_urls.spotify
    var album = data.tracks.items[0].album.name
    
    console.log("\nArtist: "+artist,"\nSong: "+ songName,"\nSpotify Link: "+link,"\nAlbum: " +album)
  
  });
}

function movie(){
  if (!value) {
    value = "Mr. Nobody";
  }
  axios.get("https://www.omdbapi.com/?t="+value+"&y=&plot=short&apikey=trilogy").then(
    function(response) {
      var title= response.data.Title
      var year= response.data.Year
      var ratingIMDB = response.data.imdbRating
      var ratingRotten = response.data.Ratings[1].Value
      var country = response.data.Country
      var language = response.data.Language
      var plot = response.data.Plot
      var actors= response.data.Actors
      
console.log("\nTitle: " +title,"\nRelease Year: " +year,"\nImbd Rating: " +ratingIMDB,"\nRotten Tomatoes Rating: " +ratingRotten,"\nCountry: " +country,"\nLanguage: " +language,"\nPlot: " +plot,"\nActors: " +actors)
       
})}
function dowhat(){
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");

    action = dataArr[0];
    value = dataArr[1];
    spotifyRun()
    //concert()
    //movie()
  });
}

