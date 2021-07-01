const express = require("express");
const router = express.Router();
const flightModel = require("../models/flightModels");
const flightDetailsModel = require("../models/flightDetailsModel");
const passport = require("passport");
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
        .then((flightdetails) => {
          console.log(flightdetails);
          res.send(flightdetails);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        });
    }
    // else {
    //   res.send("Please login");
    // }
  }
);

router.get(
  "/detail/all",
  passport.authenticate("jwt", { session: false }),
  //  .populate("PostedBy","_id username")
  (req, res) => {
    if (req.user) {
      flightDetailsModel.find({}, function (err, flightsuser) {
        if (err) {
          res.send(err);
        } else {
          res.send(flightsuser);
        }
      });
    }
    // else {
    //   res.send("Please login");
    // }
  }
);

// router.put("/like", (req, res) => {
//   Post.findByIdAndUpdate(
//     req.body.postId,
//     {
//       $push: { likes: req.user._id },
//     },
//     {
//       new: true,
//     }
//   ).exec((err, result) => {
//     if (err) {
//       return res.status(422).json({ error: err });
//     } else {
//       res.json(result);
//     }
//   });
// });
// router.put("/unlike", (req, res) => {
//   Post.findByIdAndUpdate(
//     req.body.postId,
//     {
//       $pull: { likes: req.user._id },
//     },
//     {
//       new: true,
//     }
//   ).exec((err, result) => {
//     if (err) {
//       return res.status(422).json({ error: err });
//     } else {
//       res.json(result);
//     }
//   });
// });

router.put(
  "/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
    };
    Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
  }
);


module.exports = router;
