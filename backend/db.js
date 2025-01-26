const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "";
const mongoose = require("mongoose")
mongoose.connect(uri)
  .then (()=>console.log("connected"))
  .catch(err=>console.log(err))
module.exports = mongoose;
