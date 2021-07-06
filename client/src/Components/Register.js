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
    // backgroundColor: "skyblue",
    backgroundImage: URL(
      "data:image/jpeg;base64,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"
    ),
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
