const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  myPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "filghtdetail" }],
  myLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "filghtdetail" }],
});
module.exports = mongoose.model("user", userSchema);
