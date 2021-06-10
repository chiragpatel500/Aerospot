const mongoose = require("mongoose");
const flightDetailSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flightsusers",
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
});
module.exports = mongoose.model("flightdetails", flightDetailSchema);
