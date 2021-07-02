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
          console.log("is this the null", flightdetails);
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
  }
);

router.put("/like", passport.authenticate("jwt", { session: false }),
(req, res) => {
    flightDetailsModel.findByIdAndUpdate(
    req.body.flightDetailId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err,flightDetail) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
    console.log(flightDetail);
      res.json(flightDetail);
    }
  });
});
router.put("/unlike",passport.authenticate("jwt", { session: false }),
(req, res) => {
    flightDetailsModel.findByIdAndUpdate(
    req.body.flightDetailId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, flightDetail) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
   console.log(flightDetail);
      res.json(flightDetail);
    }
  });
});

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
        },
        (err, flightDetail) => {
          if (err) {
            console.log(err);
            return res.json(err);
          } else {
            console.log(flightDetail);
            return res.json(flightDetail);
          }
        }
      )
      .populate("comments.postedBy", "_id username");
    //   .populate("postedBy.postedBy", "_id username");
    //   .exec((err, result) => {
    //   if (err) {
    //     return res.status(422).json({ error: err });
    //   } else {
    //     res.json(result);
    //   }
    // });
  }
);

module.exports = router;
