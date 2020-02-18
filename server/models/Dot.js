const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DotSchema = new Schema({
  title: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("dot", DotSchema);