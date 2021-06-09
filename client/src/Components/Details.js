import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles({
  root: {
    maxWidth: "fitcontent",
  },
});

function Details() {
  const [flights, setflights] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:5000/flights/all")
      .then((res) => res.json())
      .then((data) => setflights(data));
  }, []);
  return (
    <div>
      <h1>Flight Details</h1>
      {flights.length &&
        flights.map((flight) => (
          <div key={flight._id}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="lufthansa image"
                  height="140"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlWP_2EyIBbfJrbIikpmUNp_SzvVswy8AXqQ&usqp=CAU"
                  title="airplane image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Airline:{flight.airline}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Type:{flight.type}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Route:{flight.flightroute}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Built:{flight.built}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{
                  backgroundColor: "skyblue",
                  color: "black",
                  justifyContent: "center",
                  width: "fitcontent",
                }}
              >
                <Button size="small" color="primary">
                  <ThumbUpIcon />
                  like
                </Button>
                <Button size="small" color="primary">
                  <CommentIcon /> Comment
                </Button>
                <Button size="small" color="primary">
                  <ShareIcon /> Share
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
    </div>
  );
}

export default Details;
