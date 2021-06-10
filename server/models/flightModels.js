const mongoose = require("mongoose");
const flightSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  airline: {
    type: String,
    required: true,
  },
//   flightdetail: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "flightdetails",
//   },
});
module.exports = mongoose.model('flightsusers', flightSchema);
