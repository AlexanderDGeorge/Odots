const graphql = require("graphql");
const GraphQLSchema = graphql.GraphQLSchema;
const mutation = require("./mutations");
const query = require("./types/root_query");

module.exports = new GraphQLSchema({ query, mutation });