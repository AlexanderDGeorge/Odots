const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;
const models = require("../../models/model_index");
const Odot = mongoose.model("odot");

const DotType = new GraphQLObjectType({
  name: "DotType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    odot: {
      type: require("./odot_type"),
      resolve(parentValue) {
        return Odot.findById(parentValue.user)
          .then(odot => odot)
      }
    },
  })
})

module.exports = DotType;