import React from "react";
import { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import Grid from "@material-ui/core/Grid";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { FlightsContextProvider } from "../context/flightsContext";
import { AuthContext } from "../context/authContext";
const serverURL = require("../config").serverURL;

const useStyles = makeStyles({
  main: {
    backgroundImage: `url("https://images.unsplash.com/photo-1558418294-9da149757efe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")`,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    maxWidth: "fitcontent",
    backgroundColor: "skyblue",
  },
  likecomment: {
    display: "flex",
    flexdirection: "column",
    backgroundColor: "skyblue",
    color: "black",
  },
});

function Details() {
  const [state, setState] = useState([]);

  const [flightDetail, setFlightDetail] = useState(null);
  const classes = useStyles();
  const [item, setItem] = useState([]);
  const [comment, setComment] = useState("");

  let { flightid } = useParams();

  useEffect(() => {
    fetch(`${serverURL}/flights/${flightid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFlightDetail(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const likePost = (flightDetailId) => {
    fetch("http://localhost:5000/flights/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        flightDetailId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFlightDetail(result);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (flightDetailId) => {
    fetch("http://localhost:5000/flights/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        flightDetailId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFlightDetail(result);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (flightDetailId) => {
    if (comment != ""){
     fetch("http://localhost:5000/flights/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        flightDetailId,
        text: comment,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setFlightDetail(result);
      })
      .catch((err) => {
        console.log(err);
      });   
    } else {
      alert("put in some text")
    }
   
  };

  const deleteComment = (commentId) => {
    fetch("http://localhost:5000/flights/deleteComment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        flightDetailId:flightDetail._id,
        comment: commentId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFlightDetail(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.main}>
      <h1>Flight Details</h1>
      {flightDetail !== null && (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="lufthansa image"
              height="140"
              image={flightDetail.image}
              title="airplane image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Airline:{flightDetail.airline}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Type:{flightDetail.type}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Route:{flightDetail.flightroute}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Built:{flightDetail.built}
              </Typography>
              {/* <Typography variant="body2" color="textSecondary" component="p">
                postedBy:{flightDetail.postedBy}
              </Typography> */}
            </CardContent>
          </CardActionArea>

          <CardActions className={classes.likecomment}>
            <Grid container spacing={12}>
              <Grid item xs={6}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    likePost(flightDetail._id);
                  }}
                >
                  <ThumbUpIcon />
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    unlikePost(flightDetail._id);
                  }}
                  
                >
                  <ThumbDownIcon />
                </Button>

                <h6>{flightDetail.likes.length} likes</h6>
              </Grid>
              <Grid item xs={6}>
                <Button size="small" color="primary">
                  <ShareIcon /> Share
                </Button>
              </Grid>
              <Grid item xs={12}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(flightDetail._id);
                  }}
                >
                  <Grid item xs={12}>
                    <Button size="small" color="primary" type="submit">
                      <CommentIcon /> Comment
                    </Button>
                  </Grid>
                  <input
                    size="small"
                    type="text"
                    placeholder="add a comment"
                    onChange={(e) => {
                      console.log(`e.target.value`, e.target.value);
                      setComment(e.target.value);
                    }}
                  />
                </form>
                {flightDetail.comments.map((record) => {
                  return (
                    record.postedBy !== null && (
                      <h6 key={record._id}>
                        <span style={{ fontWeight: "500" }}>
                          {record.postedBy.username}
                        </span>
                        <span style={{ fontWeight: "500" }}>{record.text}</span>
                        <Button onClick={() => deleteComment(record._id)}>
                          <HighlightOffIcon />
                        </Button>
                      </h6>
                    )
                  );
                })}
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      )}
      {/* <div>
        <img
          src="data:image/png;base64,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"
          alt="logoimage"
        />
      </div> */}
    </div>
  );
}

export default Details;
