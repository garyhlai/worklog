const graphql = require("graphql");
const Goal = require("./models/goal");
const Dates = require("./models/date");
//const Log = require("./models/log");
const _ = require("lodash");
const mongoose = require("mongoose");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const LogType = new GraphQLObjectType({
  name: "Log",
  fields: () => ({
    id: { type: GraphQLID },
    //date: { type: GraphQLString },
    logName: { type: GraphQLString },
    goalId: { type: GraphQLString }
  })
});

const GoalType = new GraphQLObjectType({
  name: "Goal",
  fields: () => ({
    id: { type: GraphQLID },
    goalName: { type: GraphQLString },
    logs: {
      type: new GraphQLList(DateType),
      resolve(parent, args) {
        console.log("parent.id: " + parent.id);
        return Dates.find({ logs: { goalId: "5c58c2dc5267183d4e02b526" } });
      }
    }
  })
});

const DateType = new GraphQLObjectType({
  name: "Date",
  fields: () => ({
    id: { type: GraphQLID },
    dateName: { type: GraphQLString },
    logs: {
      type: new GraphQLList(LogType)
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    /*
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },*/

    /*
    dates: {
      type: new GraphQLList(DateType),
      resolve(parent, args) {
        return Dates.find({});
      }
    },
    */

    goals: {
      type: new GraphQLList(GoalType),
      resolve(parent, args) {
        return Goal.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    /*
    addGoal: {
      type: GoalType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }*/
    /*
    addLog: {
      type: LogType,
      args: {
        logName: { type: new GraphQLNonNull(GraphQLString) },
        goalId: { type: new GraphQLNonNull(GraphQLString) }
        // date: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let log = new Log({
          logName: args.logName,
          goalId: args.goalId
        });
        //Dates.findOneAndUpdate({dateName: date}, {$push:{}})
        return log.save();
      }
    },

    // add the logId to the corresponding date
    updateDate: {
      type: DateType,
      args: {
        dateName: { type: new GraphQLNonNull(GraphQLString) },
        logId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        Dates.findOneAndUpdate(
          { dateName: args.dateName },
          { $push: { logId: args.logId } }
        ).then(function() {
          return;
        });
      }
    },

    addGoal: {
      type: GoalType,
      args: {
        goalName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let goal = new Goal({
          goalName: args.goalName
        });
        return goal.save();
      }
    },
*/
    /*
    addDate: {
      type: DateType,
      args: {
        dateName: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let date = new Dates({
          dateName: args.dateName
        });
        return date.save();
      }
    }*/
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
  // mutation: Mutation
});
