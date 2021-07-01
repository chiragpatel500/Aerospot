import React from "react";
import { useEffect, useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "skyblue",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const registerFetch = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/users/Register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsLoggedIn(true);
      });
  };
  const PostImage = (ev, file) => {
    ev.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "aerospot");
    data.append("cloud_name", "chiragpatel500");
    fetch("	https://api.cloudinary.com/v1_1/chiragpatel500/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => {
        console.log(`res`, res);
        return res.json();
      })
      .then((data) => {
        console.log(`data`, data);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="uname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="UserName"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          {/* <Link to="/ListScreen"> */}
          <input
            onChange={(ev) => PostImage(ev, ev.target.files[0])}
            type="file"
            name="image"
            label="Profilepic"
            placeholder=""
            value={image}
          />

          <Button
            onClick={registerFetch}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {/* </Link> */}
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/Login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
