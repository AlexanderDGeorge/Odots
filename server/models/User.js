const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16
  },
  odots: [
    {
      type: Schema.Types.ObjectId,
      ref: "odot"
    }
  ]
});

UserSchema.statics.addOdot = (userId, odotId) => {
  const User = mongoose.model("user");
  const Odot = mongoose.model("odot");

  return User.findById(userId).then(user => {
    return Odot.findById(odotId).then(odot => {
      user.odots.push(odot);
      return Promise.all([user.save(), odot.save()]).then(
        ([user, odot]) => user
      )
    })
  })
}

UserSchema.statics.removeOdot = (userId, odotId) => {
  const User = mongoose.model("user");
  const Odot = mongoose.model("odot");

  return User.findById(userId).then(user => {
    return Odot.findById(odotId).then(odot => {
      user.odots.pull(odot);
      return Promise.all([user.save(), odot.save()]).then(
        ([user, odot]) => user
      )
    })
  })
}

module.exports = mongoose.model("user", UserSchema);