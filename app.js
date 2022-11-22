const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 4000;
const https = require("https");
const dotenv = require('dotenv').config();


app.get("/",(req,res,next)=>{
const key = process.env.MY_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${key}`;

    https.get(url, (res)=>{
        console.log(res.statusCode)
    })
    res.send(`<h1>Hello World!</h1>`);
})

app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`);
})

