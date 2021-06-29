const express = require("express");
const router = express.Router();
const flightModel = require("../models/flightModels");
const flightDetailsModel = require("../models/flightDetailsModel");
const passport = require("passport");
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      flightModel.find({}, function (err, flightsuser) {
        if (err) {
          res.send(err);
        } else {
          res.send(flightsuser);
        }
      });
    } else {
      res.send("you need to login");
    }
  }
);

router.get("/easyjet", (req, res) => {
  flightModel.find({ airline: "easyjet" }, function (err, flightsuser) {
    if (err) {
      res.send(err);
    } else {
      res.send(flightsuser);
    }
  });
});

router.get("/Lufthansa", (req, res) => {
  flightModel.find({ airline: "Lufthansa" }, function (err, flightsuser) {
    if (err) {
      res.send(err);
    } else {
      res.send(flightsuser);
    }
  });
});

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      let flightsId = req.params.id;
      console.log(flightsId);
      flightDetailsModel
        .findOne({ flightid: flightsId })
        .then((flightdetails) => {
          console.log(flightdetails);
          res.send(flightdetails);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        });
    } else {
      res.send("Please login");
    }
  }
);

router.get(
  "/detail/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      flightDetailsModel.find({}, function (err, flightsuser) {
        if (err) {
          res.send(err);
        } else {
          res.send(flightsuser);
        }
      });
    } else {
      res.send("Please login");
    }
  }
);

module.exports = router;
