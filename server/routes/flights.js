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


module.exports = router;