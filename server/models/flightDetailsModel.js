const mongoose = require("mongoose");
const flightDetailSchema = new mongoose.Schema({
  flightroute: {
    type: String,
  },
  type: {
    type: String,
  },
  built: {
    type: Number,
  },
  flightdetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flightsusers",
  },
});
module.exports = mongoose.model("filghtdetail", flightDetailSchema);
