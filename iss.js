var request = require('request');
request('http://api.open-notify.org/iss-now.json', function (error, response, body) {
  
  if (!error) {
    
    var issInfo=JSON.parse(body);
  
    console.log("The ISS is now at: " + Math.round(issInfo.iss_position.latitude*100)/100 + " x " + Math.round(issInfo.iss_position.longitude*100)/100);
  }
  else {
    console.log("there was an error: " + error);
  }

  
});