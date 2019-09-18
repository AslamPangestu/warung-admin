const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema; //get class schema from mongoose

//Create Schema
const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

//Create Model
module.exports = Role = mongoose.model("Role", RoleSchema);
