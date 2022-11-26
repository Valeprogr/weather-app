const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 4000;
const https = require("https");
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/index.html")

});
app.post("/", (req, res, next) => {
    const key = process.env.MY_KEY;
    const query = req.body.cityName;
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=${unit}`;

    https.get(url, (response) => {
        console.log(res.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius </h1>`);
            res.write(`<p>the weather is currently  ${weatherDescription}</p>`);
            res.write(`<img src="${imageUrl}"/>`)
            res.send()

        })
    })
})


app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})

