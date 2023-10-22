const mongoose = require('mongoose')

const saveRecipe=mongoose.Schema({
    id:Number,
    title:String,
    image:String,
    imageType:String
    
})

const RecipeModel=mongoose.model("SaveRecipe",saveRecipe)


module.exports =RecipeModel