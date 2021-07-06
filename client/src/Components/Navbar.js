import React from "react";
import Login from "./Login";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";
import Home from "./Home";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  console.log(state);
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ backgroundColor: "orange", color: "black" }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {isLoggedIn ? (
              <Button
                onClick={() => {
                  localStorage.clear();
                  setIsLoggedIn(false);
                  setUser(null);
                  history.push("/");
                }}
              >
                Logout
              </Button>
            ) : (
              <Link to="/Login">
                <Button>LogIn</Button>
              </Link>
            )}
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {isLoggedIn && <Link to="/ListScreen">Aerospot</Link>}
          </Typography>
          {isLoggedIn && <Link to="/MyProfile">MyProfile</Link>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
