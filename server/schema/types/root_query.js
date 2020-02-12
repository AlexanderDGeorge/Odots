const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = graphql;

const UserType = require("./user_type");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
  }
});

module.exports = RootQuery;