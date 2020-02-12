const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} = graphql;
const User = mongoose.model("user");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    loggedIn: {
      type: GraphQLBoolean
    },
    token: {
      type: GraphQLString
    },
  })
});

module.exports = UserType;
