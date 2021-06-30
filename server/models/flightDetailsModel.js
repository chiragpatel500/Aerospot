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
  likes: [{ type: ObjectId, ref: "flightsusers" }],
  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: "flightsusers" },
    },
  ],
});
module.exports = mongoose.model("filghtdetail", flightDetailSchema);
