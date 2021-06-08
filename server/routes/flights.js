const express = require('express');
const router = express.Router();
const flightModel = require("../models.js/flightModels");

router.get('/all', (req, res) => {
    flightModel.find({}, function (err, flightuser) {
        if (err) {
            res.send(err);
        } else {
            res.send(flightuser);
        }
    });
});




module.exports = router;