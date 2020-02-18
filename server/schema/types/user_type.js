const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList
} = graphql;
const models = require("../../models/model_index");
const User = mongoose.model("user");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    odots: {
      type: new GraphQLList(require("./odot_type")),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("odots")
          .then(user => user.odots)
      }
    }
  })
});

module.exports = UserType;
