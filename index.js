import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const {Pool} = pg

const app = express();
const port = 3000;
// Configure DB and establish connection
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database:"world",
  password: "201338192Mb@s@",
  port:5432
});

db.connect();
let quiz =[];




let data_1 = [];
//db.connect();

//console.log(countriesArray);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  let countriesArray = [];
  const results  = await db.query("SELECT country_code FROM visited_countries");
  const totalCountries = results.rows.length;
  results.rows.forEach((i) =>{
    countriesArray.push(i.country_code);
  });
  
  console.log(countriesArray);
  res.render("index.ejs", {countries: countriesArray, total: totalCountries});
  //db.end();
});

// POST Request to insert data into the visited_countries table
app.post("/add", async (req, res) => {
  //First find out what the user wrote
  const userCountry = req.body.country;
  // Get the country code from the countries table
  const results = await db.query("SELECT country_code, country_name FROM countries");
  //Find the index pf the country
  const searchIndex = results.rows.findIndex((i) => i.country_name === userCountry);
  const db_country_code = results.rows[searchIndex].country_code;
  db.query("INSERT INTO visited_countries (country_code)" + 
            "VALUES ($1)", [db_country_code]);
  res.redirect("/");
  //db.end();

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

