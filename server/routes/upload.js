const express = require("express");
const router = express.Router();
const uploadModel = require("../models/uploadModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Post = mongoose.model("Post");

router.post("/UploadForm", (req, res) => {
  const { type, flightroute, built, image } = req.body;
  if (!image || !type || !flightroute || !built) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  req.user.password = undefined;
  const post = new Post({
    image: req.user,
    type,
    built,
    flightroute,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
