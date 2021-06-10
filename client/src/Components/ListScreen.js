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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FlightsContextProvider } from "../context/flightsContext";

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
      <h1>Flightlist</h1>
      {flights.length != 0 &&
        flights.map((flight) => (
          <Link to={`/Details/${flight._id}`} key={flight._id}>
            <div>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="lufthansa image"
                    height="140"
                    image={flight.image}
                    title="airplane image"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {flight.airline}
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
                ></CardActions>
              </Card>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default ListScreen;

{
  /* <Button size="small" color="primary">
                 <Link to="/Details">Learn More</Link> 
                </Button> */
}
