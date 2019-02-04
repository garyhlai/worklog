const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema.js");
const mongoose = require("mongoose");
const app = express();
const Goal = require("./models/goal");
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

function setupData(placeholder, callback) {
  mongoose.connection.collections.goals.drop();
  mongoose.connection.collections.dates.drop();
  callback();
}

// Connect to mongodb
mongoose.connect(
  "mongodb://localhost/worklog",
  function(err, client) {
    if (err) {
      console.log(err);
    }
    //setupData2(0, modifyData2);
    setupData(0, modifyData);
  }
);

mongoose.connection
  .once("open", function() {
    console.log("connection established..");
  })
  .on("error", function(error) {
    console.log("connection error:", error);
  });

function modifyData() {
  // Add new data
  var aGoal = new Goal({
    goalName: "Be a better person"
  });

  aGoal.save(function() {
    var aDate = new Dates({
      dateName: "10-1-2019",
      logs: [
        { logName: "Played chess", goalId: "default1" },
        { logName: "Played Go", goalId: "default2" },
        { logName: "Played piano", goalId: "default3" }
      ]
    });
    aDate.save();
  });
}
