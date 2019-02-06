const express = require("express");
//const expressGraphQL = require("express-graphql");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema.js");
const mongoose = require("mongoose");
const app = express();
const Goal = require("./models/goal");
const Dates = require("./models/date");
const cors = require("cors");

mongoose.Promise = global.Promise;

/*
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);
*/

//const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema, //query schema, not data storage schema
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
mongoose.connect("mongodb://localhost/worklog", function(err, client) {
  if (err) {
    console.log(err);
  }
  //setupData2(0, modifyData2);
  setupData(0, modifyData);
});

mongoose.connection
  .once("open", function() {
    console.log("connection established..");
  })
  .on("error", function(error) {
    console.log("connection error:", error);
  });

//Dates.findOneAndUpdate({ dateName: "10-1-2019" }, { dateName: "5-5-5555" });

//global variable

var theId;

function modifyData() {
  var aDate2 = new Dates({
    dateName: "10-2-2019",
    logs: [
      { logName: "Played coco", goalId: "default1" },
      { logName: "Played fuge", goalId: "default2" },
      { logName: "Played ass", goalId: "default3" }
    ]
  });
  aDate2.save();

  // Add new data
  var aGoal = new Goal({
    goalName: "Be a better person"
  });

  aGoal.save(
    function() {
      var aDate = new Dates({
        dateName: "10-1-2019",
        logs: [
          { logName: "Played chess", goalId: "default1" },
          { logName: "Played Go", goalId: "default2" },
          { logName: "Played piano", goalId: "default3" }
        ]
      });
      aDate.save(
        //Goal.find({ goalName: "Be a better person" }).then(
        function() {
          console.log("found");
          /*  works
        Dates.findOneAndUpdate(
          { dateName: "10-1-2019" },
          { dateName: "1-1-1922" }
        ).then(console.log("executed"));
        */
          /* works too
        Dates.findOneAndUpdate(
          {},
          { $set: { "logs.$[elem].goalId": "100" } },
          { arrayFilters: [{ "elem.logName": "Played chess" }] }
        ).then(console.log("executed"));
        */

          Goal.findOne({ goalName: "Be a better person" })
            .then(function(result) {
              theId = result._id;
              console.log(theId);
            })
            .then(function() {
              Dates.findOneAndUpdate(
                {},
                { $set: { "logs.$[].goalId": theId } }
              ).then(console.log("executed"));
            });
        }
      );
    } //)
  );
}
