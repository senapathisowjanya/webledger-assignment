const mongoose = require('mongoose');
require("dotenv").config()

const connectionToDatabase = mongoose.connect(process.env.MONGO_URI)

module.exports =connectionToDatabase