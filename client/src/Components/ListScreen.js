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
    backgroundImage: `url("https://i.pinimg.com/originals/ab/cf/55/abcf55f5ebd054491de930ea257a5ce5.png")`,
    height: "100vh",
  },
  root: {
    maxWidth: "fitcontent",
    backgroundColor: "skyblue",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px",
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
                        {flight.postedBy}
                      </Typography>
                    </CardContent>
                  )}
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
      <div>
        <Link to="/UpLoadForm">
          Add
          <LibraryAddIcon />
          Images
        </Link>
      </div>
    </div>
  );
}

export default ListScreen;
