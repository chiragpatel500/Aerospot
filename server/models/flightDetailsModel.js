const mongoose = require("mongoose");
const flightDetailSchema = new mongoose.Schema({
  airline: {
    type: String,
  },
  image: {
    type: String,
  },
  flightroute: {
    type: String,
  },
  type: {
    type: String,
  },
  built: {
    type: Number,
  },
  flightid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flightsusers",
  },
  postedBy: {
    type: String,
    ref: "flightsusers",
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [
    {
      text: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
});

module.exports = mongoose.model("filghtdetail", flightDetailSchema);
