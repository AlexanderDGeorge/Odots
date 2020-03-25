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
        args: { 
            title: { type: GraphQLString },
            color: { type: GraphQLString },
        },
        resolve(_, { title, color }) {
            return new Odot({ title, color }).save();
        }
    },
    updateOdot: {
      type: OdotType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        color: { type: GraphQLString },
      },
      resolve(_, { id, title, color }) {
        const newOdot = {};
        if (id) newOdot.id = id;
        if (title) newOdot.title = title;
        if (color) newOdot.color = color;
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
      args: { 
        title: { type: GraphQLString },
        detail: { type: GraphQLString },
      },
      resolve(_, { title, detail }) {
        return new Dot({ title, detail }).save();
      }
    },
    updateDot: {
      type: DotType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        detail: { type: GraphQLString },
        complete: { type: GraphQLBoolean },
      },
      resolve(_, { id, title, detail, complete }) {
        const newDot = {};
        if (id) newDot.id = id;
        if (title) newDot.title = title;
        if (detail) newDot.detail = detail;
        newDot.complete = !complete;
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
        args: { 
            title: { type: GraphQLString },
            color: { type: GraphQLString },
            date: { type: GraphQLString },
        },
        async resolve(_, { title, color, date }, ctx) {
            const validUser = await AuthService.verifyUser({ token: ctx.token });
            return new Odot({ title, color, date }).save().then(odot => {
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
    updateOdotDot: {
      type: OdotType,
      args: {
        odotId: { type: new GraphQLNonNull(GraphQLID) },
        dotId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, { odotId, dotId } ) {
        return Odot.updateDot(odotId, dotId);
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