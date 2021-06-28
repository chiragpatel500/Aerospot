const express = require("express");
const router = express.Router();
const uploadModel = require("../models/uploadModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/UploadForm", (req, res) => {
  const { type, flightroute, built, image } = req.body;
  console.log(`type`, type);
  console.log(`flightroute`, flightroute);
  console.log(`built`, built);
  console.log(`image`, image);
  if (!image || !type || !flightroute || !built) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  // req.user.password = undefined;
  const upload = new uploadModel({
    image: image,
    type,
    built,
    flightroute,
  });
  console.log(`upload`, upload);
  upload
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
