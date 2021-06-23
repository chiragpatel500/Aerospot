const { MusicVideoOutlined } = require("@material-ui/icons");
const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

router.post("/register", (req, res) => {
    console.log(req.body);
})

module.exports = router;