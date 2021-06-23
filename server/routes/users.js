const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/Register", (req, res) => {
  console.log(req.body);
  //   const reqEmail = req.body.email;
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;

  userModel.findOne({ username: reqUsername }, (err, user) => {
    if (err) {
      res.json({ error: err });
    }
    if (user) {
      res.send("username is already in use");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(reqPassword, salt, function (err, hash) {
          // Store hash in your password DB.
          console.log(hash);
          const newUser = new userModel({
            username: reqUsername ? reqUsername : "",
            // email: reqEmail,
            password: hash,
          });
          newUser
            .save()
            .then((user) => {
              res.send(user);
            })
            .catch((err) => {
              res.send(err);
            });
        });
      });
    }
  });
});

router.post("/Login", (req, res) => {
  console.log(`req.body`, req.body);
  //   const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  userModel.findOne({ username: username }, (err, user) => {
    if (err) {
      res.send("username does not exist");
    } else {
      if (user === null) {
        res.send("Cannot find user with this username");
      } else {
        console.log(`user`, user);
        bcrypt.compare(password, user.password, function (err, result) {
          console.log(result);
          if (err) {
            res.send(err);
          }
          if (result) {
          } else {
            res.send("password does not match");
          }
        });
      }
    }
  });
});

module.exports = router;
