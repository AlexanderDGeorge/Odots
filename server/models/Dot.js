const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DotSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
  },
  complete: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("dot", DotSchema);