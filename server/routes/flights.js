const express = require('express');
const router = express.Router();
const flightModel = require("../models/flightModels");
const flightsuserModel = require("../models/flightModels")

router.get('/all', (req, res) => {
    flightModel.find({}, function (err, flightsuser) {
        if (err) {
            res.send(err);
        } else {
            res.send(flightsuser);
        }
    });
});

router.get('/easyjet', (req, res) => {
    flightModel.find({ airline: "easyjet" }, function (err, flightsuser) {
        if (err) {
            res.send(err);
        } else {
            res.send(flightsuser);
        }
    });
});

router.get('/Lufthansa', (req, res) => {
    flightModel.find({ airline: "Lufthansa" }, function (err, flightsuser) {
        if (err) {
            res.send(err);
        } else {
            res.send(flightsuser);
        }
    });
});

router.get('/:id', (req, res) => {
    let flightsUserId = req.params.id;
    flightsuserModel.finDById(flightsUserId, function (err, flightsuser) {
      if (err) {
        console.log(err);
      } else {
        console.log(flightsuser);
      }
    });
});


module.exports = router;