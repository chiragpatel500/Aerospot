const express = require("express");
const router = express.Router();
const flightModel = require("../models/flightModels");
const flightDetailsModel = require("../models/flightDetailsModel");
const passport = require("passport");
const userModel = require("../models/userModel");
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      flightModel.find({}, function (err, flightsuser) {
        if (err) {
          res.send(err);
        } else {
          res.send(flightsuser);
        }
      });
    } else {
      res.send("you need to login");
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      let flightsId = req.params.id;
      console.log(flightsId);
      flightDetailsModel
        .findOne({ flightid: flightsId })
        .populate({ path: "comments", populate: { path: "postedBy" } })
        .then((flightdetails) => {
          console.log("is this the null", flightdetails);
          res.send(flightdetails);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        });
    }
  }
);

router.get(
  "/detail/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      flightDetailsModel
        .find({})
        .populate({ path: "comments", populate: { path: "postedBy" } })
        .exec((err, result) => {
          console.log(`result`, result);
          console.log(`err`, err);
          if (err) {
            return res.status(422).json({ error: err });
          } else {
            res.json(result);
          }
        });
    }
  }
);

router.put(
  "/like",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { myLikes: req.body.flightDetailId },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          flightDetailsModel
            .findByIdAndUpdate(
              req.body.flightDetailId,
              {
                $addToSet: { likes: req.user._id },
              },
              {
                new: true,
              }
            )
            .populate({ path: "comments", populate: { path: "postedBy" } })
            .exec((err, result) => {
              console.log(`result`, result);
              console.log(`err`, err);
              if (err) {
                return res.status(422).json({ error: err });
              } else {
                res.json(result);
              }
            });
        }
      }
    );
  }
);
router.put(
  "/unlike",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { myLikes: req.body.flightDetailId },
      },
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          flightDetailsModel
            .findByIdAndUpdate(
              req.body.flightDetailId,
              {
                $pull: { likes: req.user._id },
              },
              {
                new: true,
              }
            )
            .populate({ path: "comments", populate: { path: "postedBy" } })
            .exec((err, result) => {
              console.log(`result`, result);
              console.log(`err`, err);
              if (err) {
                return res.status(422).json({ error: err });
              } else {
                res.json(result);
              }
            });
        }
      }
    );
  }
);

router.put(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
    };
    console.log(`req.body.flightDetailId`, req.body.flightDetailId);
    flightDetailsModel
      .findByIdAndUpdate(
        req.body.flightDetailId,
        {
          $push: { comments: comment },
        },
        {
          new: true,
          useFindAndModify: true,
        }
      )
      .populate({ path: "comments", populate: { path: "postedBy" } })
      .exec((err, result) => {
        console.log(`result`, result);
        console.log(`err`, err);
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
  }
);

router.put(
  "/deleteComment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const commentId = req.body.comment;
    console.log(`req.body.flightDetailId`, req.body.flightDetailId);
    flightDetailsModel
      .findByIdAndUpdate(
        req.body.flightDetailId,
        {
          $pull: { comments: { _id: commentId } },
        },
        {
          new: true,
          useFindAndModify: true,
        }
      )
      .populate({ path: "comments", populate: { path: "postedBy" } })
      .exec((err, result) => {
        console.log(`result`, result);
        console.log(`err`, err);
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
  }
);

module.exports = router;
