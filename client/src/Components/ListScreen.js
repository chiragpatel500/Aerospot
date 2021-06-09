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

const useStyles = makeStyles({
  root: {
        maxWidth: "fitcontent",
  },
});

function ListScreen() {
  const [flights, setflights] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:5000/flights/all")
      .then((res) => res.json())
      .then((data) => setflights(data));
  }, []);
  return (
    <div>
      <h1>flights to and from</h1>
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
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    {flight.airline}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {flight.type}
                  </Typography>
                </CardContent>
              </CardActionArea>
                    <CardActions style={{ backgroundColor: "skyblue", color: "black", justifyContent: "center", width: "fitcontent" }}>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
    </div>
  );
}

export default ListScreen;
