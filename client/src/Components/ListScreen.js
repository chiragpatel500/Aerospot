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
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { AuthContext } from "../context/authContext";

const useStyles = makeStyles({
  main: {
    backgroundColor: "skyblue",
    height: "100vh",
    marginTop: "-5%",
    marginBottom:"20%",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "skyblue",
  },
});

function ListScreen() {
  const [flights, setflights] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:5000/flights/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setflights(data));
  }, []);

  return (
    <div className={classes.main}>
      <h1>Flightlist</h1>
      <div>
        <Link to="/UpLoadForm">
          Add
          <LibraryAddIcon />
          Images
        </Link>
      </div>
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
                  {flight.postedBy && (
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                      postedby:{flight.postedBy}
                      </Typography>
                    </CardContent>
                  )}
                </CardActionArea>
              </Card>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ListScreen;
