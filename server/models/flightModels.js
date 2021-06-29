const mongoose = require("mongoose");
const flightSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  airline: {
    type: String,
  },
});
module.exports = mongoose.model('flightsusers', flightSchema);
