const mongoose = require("mongoose");
const flightSchema = new mongoose.Schema({
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
module.exports = mongoose.model('flightuser', flightSchema);