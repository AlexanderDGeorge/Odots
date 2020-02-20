const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = graphql;
const AuthService = require("../../services/auth");

const modelIndex = require('../../models/model_index');

const User = mongoose.model("user");
const Odot = mongoose.model("odot");
const Dot = mongoose.model("dot");

const UserType = require("./user_type");
const OdotType = require("./odot_type");
const DotType = require("./dot_type");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      async resolve(_, {}, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        if (validUser) {
          return User.findById(validUser.id);
        }
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
    },
    dot: {
      type: DotType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Dot.findById(args.id);
      }
    },
    dots: {
      type: new GraphQLList(DotType),
      resolve() {
        return Dot.find({});
      }
    }
  }
});

module.exports = RootQuery;