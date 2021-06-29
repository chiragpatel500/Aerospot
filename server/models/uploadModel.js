const mongoose = require("mongoose");

const uploadModelSchema = new mongoose.Schema({
  flightroute: {
    type: String,
  },
  airline: {
    type: String,
  },
  type: {
    type: String,
  },
  built: {
    type: Number,
  },
  image: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("uploadModel", uploadModelSchema);
