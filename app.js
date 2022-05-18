import express from "express";
const app = express();
import ejs from "ejs";
import fetch from "node-fetch";


//api key
const myKey = "d8554781d7a4d5e4d0d92295e6194fc4";

// Kelvin to Celsius
function ktoC(k) {
  return (k - 273.15).toFixed(1);
}

//middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;

  fetch(url)
    .then((d) => d.json())
    .then((djs) => {
      let { temp } = djs.main;
      let newTemp = ktoC(temp);
      res.render("weather.ejs", { djs, newTemp });
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
