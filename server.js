const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema.js");
const mongoose = require("mongoose");
const app = express();
const Goal = require("./models/goal");
const Log = require("./models/log");

mongoose.Promise = global.Promise;

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

var thatGoalId;

function setupData(placeholder, callback) {
  mongoose.connection.collections.goals.drop();
  mongoose.connection.collections.logs.drop();
  callback();
}

// Connect to mongodb
mongoose.connect(
  "mongodb://localhost/worklog",
  function(err, client) {
    if (err) {
      console.log(err);
    }
    //client.db.listCollections().toArray(function(err, collections) {
    //console.log("collections length is: " + collections.length);
    //console.log("THis is collection" + collections);
    setupData(0, modifyData);
    //});
  }
);

mongoose.connection
  .once("open", function() {
    //mongoose.connection.collections.goals.drop();
    //mongoose.connection.collections.logs.drop();
    console.log("connection established..");
  })
  .on("error", function(error) {
    console.log("connection error:", error);
  });

// app.use(express.static("/addData.js"));

function modifyData() {
  // Add new data
  var aGoal = new Goal({
    goalName: "Be a better person"
  });

  aGoal.save(function() {
    Goal.findOne({ goalName: "Be a better person" }).then(function(result) {
      /*console.log(result + "here");
      console.log(result._id);*/
      thatGoalId = result._id;

      //console.log("It is:" + thatGoalId);

      var aLog = new Log({
        logName: "Worked hard",
        date: "10-1-2019",
        goalId: thatGoalId
      });

      var aLog1 = new Log({
        logName: "Played hard",
        date: "10-2-2019",
        goalId: thatGoalId
      });

      aLog.save();
      aLog1.save();
    });
  });

  // Hardcode the data now
  // Clear the collection first
}
