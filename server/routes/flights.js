const express = require('express');
const router = express.Router();
const flightModel = require("../models.js/flightModels");

router.get('/all', (req, res) => {
    flightModel.find({}, function (err, flightSchema) {
        if (err) {
            res.send(err);
        } else {
            res.send(flightSchema);
        }
    });
});




module.exports = router;