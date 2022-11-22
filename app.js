const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 4000;
const https = require("https");
const dotenv = require('dotenv').config();


app.get("/",(req,res,next)=>{
const key = process.env.MY_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${key}&units=metric`;

    https.get(url, (response)=>{
        console.log(res.statusCode);
        response.on("data", (data)=>{
          const weatherData = JSON.parse(data)
          const temp = weatherData.main.temp;
          const weatherDescription= weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageUrl= `http://openweathermap.org/img/wn/${icon}@2x.png`

          res.write(`<h1>The temperature in Berlin is ${temp} degrees Celcius </h1>`);
          res.write(`<p>the weather is currently  ${weatherDescription}</p>`);
          res.write(`<img src="${imageUrl}"/>`)
          res.send()

        })
    })
    
})

app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`);
})

