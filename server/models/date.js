// This file is to define the data storage model in mongodb
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  logName: String,
  goalId: String
});

// Create schemas (like class, blueprint for the object)
const DateSchema = new Schema({
  dateName: String,
  logs: [LogSchema]
});

// Create the model based on the schema (like object)
const Dates = mongoose.model("date", DateSchema);

module.exports = Dates;

/* A model is just like a JS object (schema is like a class, the blueprint for the object), so we can literally call

var myChar = new MarioChar({});

*/
