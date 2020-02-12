const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OdotSchema = new Schema({
  title: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("odot", OdotSchema);