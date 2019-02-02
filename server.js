const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema.js");
const mongoose = require("mongoose");
const app = express();
const Goal = require("./models/goal");

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Server is running on port 4000..");
});

// Connect to mongodb
mongoose.connect("mongodb://localhost/worklog");
mongoose.connection
  .once("open", function() {
    console.log("connection established..");
  })
  .on("error", function(error) {
    console.log("connection error:", error);
  });

// app.use(express.static("/addData.js"));

// Hardcode the data now

// Clear the collection first

mongoose.connection.collections.goals.drop();

// Add new data
var aGoal = new Goal({
  goalName: "Be a better person",
  logs: [
    { logName: "Played chess", date: "10 - 1 - 2017" },
    { logName: "Played piano", date: "10 - 2 - 2016" }
  ]
});

aGoal.save();
