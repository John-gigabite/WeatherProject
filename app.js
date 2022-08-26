// require express.js
const express = require("express");
const app = express();

// require https
const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:  true}));

// for when client makes GET request to our server
app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "c2dededd2fe315a1d1361232817941dc";
  const units = "metric"
  const url  = "https://api.openweathermap.org/data/2.5/weather?q=" + query +  "&appid=" + apiKey + "&units=" + units;

  // making get request to someone else's server using an api
  https.get(url, function (response){
    console.log(response.statusCode);


    response.on("data", function(data){
      // takes response from other server and turns it into JS object (no strings)
      const weatherData = JSON.parse(data);

      // use newly formed JS object to access its data
      const temp = weatherData.main.temp;
      const weatherDescr = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently "+ weatherDescr + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src= "+ imgURL + ">");
      res.send();
    })
  })

})


// our server is listening for GET requests on port 3000
app.listen(3000, function(){
  console.log("Server is running on port 3000!");
})
