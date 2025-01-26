const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://s202024100:xoznaw-hucjuV-gexqo5@cluster0.pfmej.mongodb.net/Sen?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require("mongoose")
mongoose.connect(uri)
  .then (()=>console.log("connected"))
  .catch(err=>console.log(err))
module.exports = mongoose;