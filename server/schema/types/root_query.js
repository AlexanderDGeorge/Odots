const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = graphql;

const modelIndex = require('../../models/model_index');

const User = mongoose.model("user");
const Odot = mongoose.model("odot");

const UserType = require("./user_type");
const OdotType = require("./odot_type");

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
    odot: {
      type: OdotType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Odot.findById(args.id);
      }
    },
    odots: {
      type: new GraphQLList(OdotType),
      resolve() {
        return Odot.find({});
      }
    }
  }
});

module.exports = RootQuery;