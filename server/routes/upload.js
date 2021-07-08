const express = require("express");
const router = express.Router();
// const uploadModel = require("../models/uploadModel");
const flightModel = require("../models/flightModels");
const flightDetailModel = require("../models/flightDetailsModel");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const userModel = require("../models/userModel");
router.post(
  "/flights",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { type, airline, flightroute, built, image, postedBy} = req.body;
    console.log(`type`, type);
    console.log(`airline`, airline);
    console.log(`flightroute`, flightroute);
    console.log(`built`, built);
    console.log(`image`, image);
    console.log(`postedby`, postedBy)
    if (!image || !type || !flightroute || !built || !airline) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    // req.user.password = undefined;
    const newFlight = new flightModel({
      image: image,
      airline,
    });

    newFlight
      .save()
      .then((result) => {
        console.log(`result`, result);
        const newFlightDetail = new flightDetailModel({
          image: image,
          airline,
          type,
          flightroute,
          built,
          flightid: result._id,
          postedBy: req.user._id,
        });
        newFlightDetail
          .save()
          .then((resultDetail) => {
            const flightDetailsId = resultDetail._id;
            userModel.findByIdAndUpdate(
              req.user._id,
              {
                $push: { myPosts: flightDetailsId },
              },
              { new: true },
              (err, resultUser) => {
                if (err) {
                  res.send(err);
                } else {
                  res.send({ success: true, result: result });
                }
              }
            );
          })
          .catch((err) => res.send(err));
        // res.json({ post: result });
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

module.exports = router;
