/* // require request
var request = require('request');

// basic ISS program
request('http://api.open-notify.org/iss-now.json', function (error, response, body) {
  
  if (!error) {
    
    var issInfo=JSON.parse(body);
    var issLatitude = issInfo.iss_position.latitude;
    var issLongitude = issInfo.iss_position.longitude;
    
    console.log("The ISS is now at: " + Math.round(issLatitude*100)/100 + " x " + Math.round(issLongitude*100)/100);
  }
  else {
    console.log("there was an error: " + error);
  }

  
}); */

// failed attempt

/*
request('https://maps.googleapis.com/maps/api/geocode/json?address='+prompt, function (error, response, body) {
  
  if (!error) {
    
    var cityInfo=JSON.parse(body);
  
    console.log("You are now located there: " + Math.round(cityInfo.position.lat*100)/100 + " x " + Math.round(cityInfo.position.lng*100)/100);
  }
  else {
    console.log("there was an error: " + error);
  }

  
}); */


/////// ISS IMPROVED

// require request
var request = require('request');

// require prompt
var prompt = require('prompt');

// basic ISS program
request('http://api.open-notify.org/iss-now.json', function (error, response, body) {
  
  if (!error) {
    
    var issInfo=JSON.parse(body);
    var issLatitude = issInfo.iss_position.latitude;
    var issLongitude = issInfo.iss_position.longitude;
    
    // Start the prompt
  prompt.start();

  // Get one property from the user: his currentLocation
  prompt.get(['currentLocation'], function (err, result) {
    
    // Log the results.
    if (err){
        console.log("There was a problem with the input")
    }
    else{
          request('https://maps.googleapis.com/maps/api/geocode/json?address='+result.currentLocation, function (error, response, body) {
  
            if (!error) {
    
              var cityInfo=JSON.parse(body);
              var cityLatitude = cityInfo.results[0].geometry.location.lat;
              var cityLongitude = cityInfo.results[0].geometry.location.lng;
  
              // console.log("You are now located there: " + Math.round(cityInfo.results[0].geometry.location.lat*100)/100 + " x " + Math.round(cityInfo.results[0].geometry.location.lng*100)/100);
              
              var R = 6371000; // metres
              var φ1 = issLatitude* Math.PI / 180;
              var φ2 = cityLatitude* Math.PI / 180;
              var Δφ = (cityLatitude-issLatitude)* Math.PI / 180;
              var Δλ = (cityLongitude-issLongitude)* Math.PI / 180;

              var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                      Math.cos(φ1) * Math.cos(φ2) *
                      Math.sin(Δλ/2) * Math.sin(Δλ/2);
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

              var d = R * c;
              console.log('You are currently located ' + Math.round(d*100)/100 + "m away from the ISS.")
              
          }
          else {
              console.log("there was an error: " + error);
          }

  
      })
    }
    
  });
    
  }
  else {
    console.log("there was an error: " + error);
  }

  
}); 

/*


  // Start the prompt
  prompt.start();

  // Get one property from the user: his currentLocation
  prompt.get(['currentLocation'], function (err, result) {
    
    // Log the results.
    if (err){
        console.log("There was a problem with the input")
    }
    else{
          request('https://maps.googleapis.com/maps/api/geocode/json?address='+result.currentLocation, function (error, response, body) {
  
            if (!error) {
    
              var cityInfo=JSON.parse(body);
  
              console.log("You are now located there: " + Math.round(cityInfo.results[0].geometry.location.lat*100)/100 + " x " + Math.round(cityInfo.results[0].geometry.location.lng*100)/100);
              
              var R = 6371000; // metres
              var φ1 = lat1.toRadians();
              var φ2 = lat2.toRadians();
              var Δφ = (lat2-lat1).toRadians();
              var Δλ = (lon2-lon1).toRadians();

              var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                      Math.cos(φ1) * Math.cos(φ2) *
                      Math.sin(Δλ/2) * Math.sin(Δλ/2);
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = R * c;
              
          }
          else {
              console.log("there was an error: " + error);
          }

  
      })
    }
    
  });


*/
