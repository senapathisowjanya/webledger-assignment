const express = require("express");
const RecipeRoute = express.Router();
const fetch = require("node-fetch");
const auth = require("../middleware/auth");

RecipeRoute.get("/search", (req, res) => {
   
  const { item } = req.query;

console.log(item);
  (async () => {

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${item}&apiKey=80490e84b3a84104b2b00b55b6771df5`);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        res.json(data); 
      } else {
        console.log("Error while fetching data");
        res.status(response.status).json({ error: "Error fetching data" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })();

});

RecipeRoute.get("/allsearch",(req, res) => {
  
  (async () => {

    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=80490e84b3a84104b2b00b55b6771df5`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        res.json(data); 
      } else {
        console.log("Error while fetching data");
        res.status(response.status).json({ error: "Error fetching data" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })();

});

module.exports = RecipeRoute;
