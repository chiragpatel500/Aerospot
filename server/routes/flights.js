const express = require("express");
const router = express.Router();
const flightModel = require("../models/flightModels");
const flightDetailsModel = require("../models/flightDetailsModel");

router.get("/all", (req, res) => {
  flightModel.find({}, function (err, flightsuser) {
    if (err) {
      res.send(err);
    } else {
      res.send(flightsuser);
    }
  });
});

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

router.get("/:id", (req, res) => {
  let flightsId = req.params.id;
  console.log(flightsId);
  flightDetailsModel
    .findOne({flightid: flightsId })
    .then((flightdetails) => {
      console.log(flightdetails);
      res.send(flightdetails);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});


router.get("/detail/all", (req, res) => {
  flightDetailsModel.find({}, function (err, flightsuser) {
    if (err) {
      res.send(err);
    } else {
      res.send(flightsuser);
    }
  });
});




module.exports = router;
