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
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FlightsContextProvider } from "../context/flightsContext";

const useStyles = makeStyles({
  root: {
    maxWidth: "fitcontent",
  },
});

function Details() {
  const [flights, setflights] = useState([]);
  const classes = useStyles();
  
  useEffect(() => {
    fetch("http://localhost:5000/flights/")
      .then((res) => res.json())
      .then((data) => setflights(data));
  }, []);
  return (
    <div>
      <h1>Flight Details</h1>
    </div>
  );
}

export default Details;
