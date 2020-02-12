const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const models = require('../../models/model_index');
const User = mongoose.model("user");

const OdotType = new GraphQLObjectType({
  name: "OdotType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    user: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.user)
          .then(user => user)
      }
    },
  })
})

module.exports = OdotType;