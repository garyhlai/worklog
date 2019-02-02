const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema.js");
const mongoose = require("mongoose");
const app = express();
const Goal = require("./models/goal");
const Log = require("./models/log");
const Dates = require("./models/date");

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

//global
var thatGoalId;
var logId1 = "default1";
var logId2 = "default2";

function setupData(placeholder, callback) {
  mongoose.connection.collections.goals.drop();
  mongoose.connection.collections.logs.drop();
  mongoose.connection.collections.dates.drop();
  callback();
}

function setupData2(placeholder, callback) {
  //mongoose.connection.collections.dates.drop();
  setupData(0, modifyData);
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
    setupData2(0, modifyData2);
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
        //date: "10-1-2019",
        goalId: thatGoalId
      });

      var aLog1 = new Log({
        logName: "Played hard",
        //date: "10-2-2019",
        goalId: thatGoalId
      });

      aLog.save(function() {
        Log.findOne({ logName: "Worked hard" }).then(function(result) {
          logId1 = result._id;
          console.log("logId1: " + logId1);
        });
      });
      aLog1.save(function() {
        Log.findOne({ logName: "Played hard" }).then(function(result) {
          logId2 = result._id;
          console.log("logId2: " + logId2);
        });
      });
    });
  });
}

function modifyData2() {
  var aDate = new Dates({
    dateName: "10-1-2019",
    //date: "10-1-2019",
    logId: [logId1, logId2]
  });

  aDate.save();
}
