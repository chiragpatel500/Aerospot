const mongoose = require("mongoose");

const uploadModel = new mongoose.Schema({
  flightroute: {
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
module.exports = mongoose.model("uploadModel", uploadSchema);
