const express = require("express");
const ejs=require("ejs");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const config=require("./config.json");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');



var mykey=config.APP_ID;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    // var city = req.body.cityName;
    // console.log("req is" + req)
})


app.post("/", (req, res) => {
    const city=req.body.cityName;
    // console.log(city)
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+mykey;
    // console.log(url)
    https.get(url, (response) => {
        // console.log(response)

        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const whichCity = weatherData.name
            const icon = weatherData.weather[0].icon
            const description=weatherData.weather[0].description
            const mains=weatherData.weather[0].main
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.render("result",{cityName:whichCity,temperature:temp,describe:description,icon:iconUrl})

        })
    })


})


app.listen(3000, (req, res) => {
    console.log("<h1>Sever is Started at port 3000</h1>")
})
