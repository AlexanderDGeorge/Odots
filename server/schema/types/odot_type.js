const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const models = require("../../models/model_index");
const User = mongoose.model("user");
const Odot = mongoose.model("odot");

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
    dots: {
      type: new GraphQLList(require("./dot_type")),
      resolve(parentValue) {
        return Odot.findById(parentValue._id)
          .populate("dots")
          .then(odot => odot.dots)
      }
    }
  })
})

module.exports = OdotType;