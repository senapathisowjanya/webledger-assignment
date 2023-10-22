const express = require("express");
const RecipeRoute = express.Router();
const fetch = require("node-fetch");
const RecipeModel = require("../model/recipe.model");
const auth = require("../middleware/auth.middleware");


RecipeRoute.get("/search",auth, (req, res) => {
   
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

RecipeRoute.get("/allsearch",auth, (req, res) => {
  
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

RecipeRoute.get("/singlerecipe/:id", (req, res) => {
  const { id } = req.params;

  (async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=80490e84b3a84104b2b00b55b6771df5`);
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

RecipeRoute.post("/savedRecipe",async(req,res)=>{
    const payload=req.body
    console.log("saved",payload)
    try {
      const recipe=new RecipeModel(payload)
      await recipe.save()
      res.send({msg:"savedRecipe"})
    } catch (error) {
      res.send({msg:"error saving recipe"})
    }
})

RecipeRoute.get("/savedRecipe",auth,async(req,res)=>{
  
  try {
    const recipe=await RecipeModel.find()
   
    res.send({msg:recipe})
  } catch (error) {
    res.send({msg:"error saving recipe"})
  }
})



module.exports = RecipeRoute;
