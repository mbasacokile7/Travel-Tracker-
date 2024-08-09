import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
// Configure DB and establish connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database:"world",
  password: "201338192Mb@s@",
  port:5432
});

db.connect();
let quiz =[];
let countriesArray = [];

db.query("SELECT country_code FROM visited_countries", (error, res) =>{
  if(error){
    console.log("There was an error while querying", error.stack);
  } else{
    quiz = res.rows;
    quiz.forEach((i) => {
      countriesArray.push(i.country_code);
    });
  }
  db.end();
});



//console.log(countriesArray);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const totalCountries = quiz.length;
  
  //console.log(countriesArray);
  res.render("index.ejs", {countries: countriesArray, total: totalCountries});
 
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

