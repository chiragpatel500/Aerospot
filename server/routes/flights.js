const express = require('express');
const router = express.Router();
const flightModel = require("../models/flightModels");

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
    flightModel.find({airline: "easyjet"}, function (err, flightsuser) {
        if (err) {
            res.send(err);
        } else {
            res.send(flightsuser);
        }
    });
});


module.exports = router;