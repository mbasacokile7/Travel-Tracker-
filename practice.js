let countries = ["FR", "GB", "US"];
let newString = null ;
countries.forEach((country) => {
    newString = country + " " + country;
    //console.log(newString);
});
console.log(newString);
console.log(newString.split(" "));