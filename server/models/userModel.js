const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    },
    password: {
        type: string,
        required:true,
  },
});
module.exports = mongoose.model("user", userSchema);
