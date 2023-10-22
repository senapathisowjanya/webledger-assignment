const express = require('express');
const connectionToDatabase=require("./Config/connection");
const cokkies = require("cookie-parser")
const UserRoute = require('./Controllers/user.controllers');
const RecipeRoute = require('./Controllers/recipeSearch.controllers');
const app = express();
const cors=require('cors');
const auth = require('./middleware/auth.middleware');
app.use(cors())

app.use(express.json());
require("dotenv").config()

app.use(cokkies())
app.use("/user", UserRoute)
app.use("/recipe", RecipeRoute)

app.listen(process.env.port, async()=>{
    try {
        await connectionToDatabase
        console.log("Connected to database")
    console.log(`listening on port ${process.env.port}`)

    } catch (error) {
        console.log(`Error connecting to database ${error.message}`)
    }
})