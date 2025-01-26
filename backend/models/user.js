const db = require("../db");

const userSchema = new db.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  fullName: { type: String, required: true },
  isDoc: { type: Boolean, default: false },
  hashedPassword: { type: String, required: true },
});

const User = db.model("User", userSchema, "user");

module.exports = User;