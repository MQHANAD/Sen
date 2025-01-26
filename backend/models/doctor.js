const db = require("../db");

const DoctorSchema = new db.Schema( {     
  fullName:String,
  avatar:String,
  Hospital:String,
  RatingNumber:Number,
  rating:Number,
  specialty:String,
  tmpDist:Number,
  }
);
const Doctor = db.model("Doctor", DoctorSchema, "Doctor");

module.exports = Doctor;
