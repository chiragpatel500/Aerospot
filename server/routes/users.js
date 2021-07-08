const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const secretOrKey = require("../config.js").secretOrKey;
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/Register", (req, res) => {
  console.log(req.body);
  //   const reqEmail = req.body.email;
  const reqUsername = req.body.username;
  const reqPassword = req.body.password;
  const reqImage = req.body.image;
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
            image: reqImage
              ? reqImage
              : "https://images-na.ssl-images-amazon.com/images/I/519OiBnEEdL._AC_.jpg",
          });
          newUser
            .save()
            .then((user) => {
              const options = {
                id: user._id,
              };
              const token = jwt.sign(options, secretOrKey, {
                expiresIn: "48hr",
              });
              console.log(token);
              res.json({
                success: true,
                token: token,
                user,
              });
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
            const options = {
              id: user._id,
            };
            const token = jwt.sign(options, secretOrKey, { expiresIn: "48hr" });
            console.log(token);
            res.json({
              success: true,
              token: token,
              user,
            });
          } else {
            res.send("password does not match");
          }
        });
      }
    }
  });
});

router.get(
  "/MyProfile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    userModel
      .findById(req.user._id)
      .populate({ path: "myPosts" })
      .populate({ path: "myLikes", populate: { path: "postedBy" } })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => res.send(err));
  }
);

router.put(
  "/updatePic",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(`req.body.image`, req.body.image);
    userModel.findByIdAndUpdate(
      req.user.id,
      { image: req.body.image },
      (err, updatedUser) => {
        if (err) {
          res.send(err);
        } else {
          console.log(`updatedUser`, updatedUser);
          res.send(updatedUser);
        }
      }
    );
  }
);
module.exports = router;
