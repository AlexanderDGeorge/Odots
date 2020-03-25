const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OdotSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'red'
  },
  dots: [
    {
      type: Schema.Types.ObjectId,
      ref: "dot"
    }
  ]
});

OdotSchema.statics.addDot = (odotId, dotId) => {
  const Odot = mongoose.model("odot");
  const Dot = mongoose.model("dot");

  return Odot.findById(odotId).then(odot => {
    return Dot.findById(dotId).then(dot => {
      odot.dots.push(dot);
      return Promise.all([odot.save(), dot.save()]).then(
        ([odot, dot]) => odot
      )
    })
  })
};

OdotSchema.statics.removeDot = (odotId, dotId) => {
  const Odot = mongoose.model("odot");
  const Dot = mongoose.model("dot");

  return Odot.findById(odotId).then(odot => {
    return Dot.findById(dotId).then(dot => {
      odot.dots.pull(dot);
      return Promise.all([odot.save(), dot.save()]).then(
        ([odot, dot]) => odot
      )
    })
  })
}

module.exports = mongoose.model("odot", OdotSchema);