const mongoose = require("mongoose");
const flightSchema = new mongoose.Schema({
    image: {
      type: String,  
    },
    airline: {
        type: String,
        required: true,
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
module.exports = mongoose.model('flightsusers', flightSchema);