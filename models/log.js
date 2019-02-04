// This file is to define the data storage model in mongodb
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  logName: String,
  goalId: String
});

// Create the model based on the schema (like object)
const Log = mongoose.model("log", LogSchema);

module.exports = Log;

/* A model is just like a JS object (schema is like a class, the blueprint for the object), so we can literally call

var myChar = new MarioChar({});

*/
