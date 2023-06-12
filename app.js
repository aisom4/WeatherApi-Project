// // //WEATHER APPLICATION
// // //THE PACKAGES WE ARE USING!!!!
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const https = require("https");

// //creating our route for URL to page.html
// app.use(bodyParser.urlencoded({ extended: true })); //bodyParser parse url code from body to html
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/page.html");
// });

// //Implementing our API CALL to our URL
// app.post("/", function (req, res) {
//   const cityName = req.body.cityName;
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=35.2271&lon=-80.8431&appid=5e4491f728a8dcb243f4329314098807&units=imperial`;
//   https.get(url, function (response) {
//     response.on("data", function (data) {
//       const jsondata = JSON.parse(data);
//       const temp = jsondata.main.temp;

//       const des = jsondata.weather[0].description;
//       const icon = jsondata.weather[0].icon;
//       const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//       res.write(`<h1>The Temperature In ${cityName} is ${temp} degrees. </h1>`);
//       res.write(`<p>The Weather Description is ${des}</p>`);
//       res.write("<img src = " + imageurl + ">");
//     });
//   });
// });

// app.listen(3004);

//I can include a varible beside the lon=
// city.coord.lonCity geo location, longitude

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

//creating our route for URL to page.html
app.use(bodyParser.urlencoded({ extended: true })); //bodyParser parse url code from body to html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});

//Implementing our API CALL to our URL
app.post("/", function (req, res) {
  const cityName = req.body.cityName;

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},US&limit=&appid=5e4491f728a8dcb243f4329314098807`; // In the future I will add stateCode zipCode.

  https.get(geoUrl, function (response) {
    response.on("data", function (data) {
      const jsondataGeo = JSON.parse(data);
      console.log(jsondataGeo);
      const lat = jsondataGeo[0].lat; //the data is in an array so we need [0] to access the array items
      const lon = jsondataGeo[0].lon;
      console.log(lat, lon); //needed to console.log results to check if the code is working properly.

      // if (jsondataGeo.length === 0) {
      //   res.write(`<h1>There was no data found for ${cityName}</h1>`);
      //   res.send();
      //   return;
      // }

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5e4491f728a8dcb243f4329314098807&units=imperial`;

      https.get(url, function (response) {
        response.on("data", function (data) {
          const jsondata = JSON.parse(data);
          console.log(jsondata);
          const temp = jsondata.main.temp;
          const des = jsondata.weather[0].description;
          const icon = jsondata.weather[0].icon;
          // // const mainDescr = jsondata.weather[0].main;  //A main description of the weather
          const feels = jsondata.main.feels_like;
          const humidity = jsondata.main.humidity;
          const clouds = jsondata.clouds.all;
          const windSpeed = jsondata.wind.speed;
          const windGust = jsondata.wind.gust;
          const imageurl =
            "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          res.write(
            `<h1>The Temperature In ${cityName} is ${temp} degrees. </h1>`
          );
          res.write(`<p>The Weather Description is ${des}.</p>`);
          res.write(
            `<p>It feels like ${feels} degrees and the humidty is ${humidity}%!</p>`
          );
          res.write(`<p>There is ${clouds}% cloudiness currently.</p>`);
          res.write(
            `<p>The wind is going ${windSpeed} and ${windGust} mph.</p>`
          );
          res.write("<img src = " + imageurl + ">");
          res.send();
        });
      });
    });
  });
});

app.listen(3004);
