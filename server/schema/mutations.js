const mongoose = require("mongoose");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;
const AuthService = require("../services/auth");

const UserType = require("./types/user_type");
const OdotType = require("./types/odot_type");
const DotType = require("./types/dot_type");

const models = require("../models/model_index");
const User = mongoose.model("user");
const Odot = mongoose.model("odot");
const Dot = mongoose.model("dot");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: {
          type: GraphQLString
        }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    newOdot: {
      type: OdotType,
      args: { title: { type: GraphQLString } },
      resolve(_, { title }) {
        return new Odot({ title }).save();
      }
    },
    updateOdot: {
      type: OdotType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString }
      },
      resolve(_, { id, title }) {
        const newOdot = {};
        if (id) newOdot.id = id;
        if (title) newOdot.title = title;
        return Odot.findByIdAndUpdate(
          { _id: id },
          { $set: newOdot },
          { new: true },
          (err, odot) => {
            return odot;
          }
        )
      }
    },
    deleteOdot: {
      type: OdotType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return Odot.findOneAndDelete({ _id: id })
      }
    },
    newDot: {
      type: DotType,
      args: { title: { type: GraphQLString } },
      resolve(_, { title }) {
        return new Dot({ title }).save();
      }
    },
    updateDot: {
      type: DotType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        complete: { type: GraphQLBoolean },
      },
      resolve(_, { id, title, complete }) {
        const newDot = {};
        if (id) newDot.id = id;
        if (title) newDot.title = title;
        if (complete) newDot.complete = complete;
        return Dot.findByIdAndUpdate(
          { _id: id },
          { $set: newDot },
          { new: true },
          (err, Dot) => {
            return Dot;
          }
        )
      }
    },
    deleteDot: {
      type: DotType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return Dot.findOneAndDelete({ _id: id })
      }
    },
    newUserOdot: {
      type: UserType,
      args: { title: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(_, { title }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        return new Odot({ title }).save().then(odot => {
          if (validUser.loggedIn) {
            return User.addOdot(validUser.id, odot._id)
          }
        })
      }
    },
    removeUserOdot: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(_, { id }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        if (validUser.loggedIn) {
          return User.removeOdot(validUser.id, id)
        }
      }
    },
    newOdotDot: {
      type: OdotType,
      args: { 
        title: { type: new GraphQLNonNull(GraphQLString) },
        odotId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, { title, odotId }) {
        return new Dot({ title }).save().then(dot => {
          return Odot.addDot(odotId, dot._id)
        })
      }
    },
    removeOdotDot: {
      type: OdotType,
      args: { 
        odotId: { type: new GraphQLNonNull(GraphQLID) },
        dotId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, { odotId, dotId } ) {
        return Odot.removeDot(odotId, dotId);
      }
    }
  }
});

module.exports = mutation;