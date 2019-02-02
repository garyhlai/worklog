const graphql = require("graphql");
const Goal = require("./models/goal");
const Log = require("./models/log");
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
    date: { type: GraphQLString },
    logName: { type: GraphQLString },
    goals: {
      type: new GraphQLList(GoalType),
      resolve(parent, args) {
        return Goal.findById(parent.goalId);
      }
    }
  })
});

const GoalType = new GraphQLObjectType({
  name: "Goal",
  fields: () => ({
    id: { type: GraphQLID },
    goalName: { type: GraphQLString },
    logs: {
      type: new GraphQLList(LogType),
      resolve(parent, args) {
        return Log.find({ goalId: parent.id });
      }
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
    goals: {
      type: new GraphQLList(GoalType),
      resolve(parent, args) {
        return Goal.find({});
      }
    }
  }
});

/*
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
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
    }/*,
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
    }
  }
});*/

module.exports = new GraphQLSchema({
  query: RootQuery
  //mutation: Mutation
});
