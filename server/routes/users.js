const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

router.post("/Register", (req, res) => {
  console.log(req.body);
  const reqEmail = req.body.email;
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;
});

module.exports = router;
