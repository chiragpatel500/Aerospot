const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
    password: {
        type: String,
        required:true,
  },
  image: {
      type:String,
    }
});
module.exports = mongoose.model("user", userSchema);
