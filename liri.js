require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//var input = process.argv[2];
var artist = "Cher";
//if (input === "concert-this"){}

function searchBandsInTown(artist) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Constructing HTML containing the artist information
    //   var artistName = $("<h1>").text(response.name);
    //   var artistURL = $("<a>").attr("href", response.url).append(artistName);
    //   var artistImage = $("<img>").attr("src", response.thumb_url);
    //   var trackerCount = $("<h2>").text(response.tracker_count + " fans tracking this artist");
    //   var upcomingEvents = $("<h2>").text(response.upcoming_event_count + " upcoming events");
    //   var goToArtist = $("<a>").attr("href", response.url).text("See Tour Dates");

    });
  }

searchBandsInTown();
