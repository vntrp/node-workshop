var request = require('request');

request('https://maps.googleapis.com/maps/api/geocode/json?address=montreal', function (error, response, body) {
  
          if (!error) {
    
              var cityInfo=JSON.parse(body);
  
              console.log("You are now located there: " + Math.round(cityInfo.results[0].geometry.location.lat*100)/100 + " x " + Math.round(cityInfo.results[0].geometry.location.lng*100)/100);
          }
          else {
              console.log("there was an error: " + error);
          }

  
      })