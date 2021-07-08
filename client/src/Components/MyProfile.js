import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  main: {
    backgroundImage: `url("https://i.ytimg.com/vi/lmWt0Icl2kM/maxresdefault.jpg")`,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    maxWidth: "fitcontent",
    backgroundColor: "skyblue",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "skyblue",
  },
  MyProfile: {
    maxWidth: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
const MyProfile = () => {
  const classes = useStyles();
  // const [users, setUsers] = useState([]);
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [image, setImage] = useState("");
  // const [mypics, setMyPics] = useState([]);
  // const [liked, setLiked] = useState([]);

  const updateProfilePicture = (newUrl) => {
    console.log(`newUrl`, newUrl);
    fetch("http://localhost:5000/users/updatePic", {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        image: newUrl,
      }),
    })
      .then((res) => {
        console.log(`res`, res);
        return res.json();
      })
      .then((data) => {
        console.log(`data`, data);
        alert("Profile picture succesfully updated");
        setUser({ ...user, image: data.image });
        window.location.reload();
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const changeImage = (ev, file) => {
    ev.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "aerospot");
    data.append("cloud_name", "chiragpatel500");
    fetch("https://api.cloudinary.com/v1_1/chiragpatel500/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => {
        console.log(`res`, res);
        return res.json();
      })
      .then((data) => {
        console.log(`data`, data);
        updateProfilePicture(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(`user`, user);

  return (
    <div className={classes.main}>
      {user && (
        <div>
          <div className={classes.MyProfile}>
            <p>Profile Picture:</p>
            <CardMedia
              component="img"
              alt="user profile"
              height="140"
              image={user.image}
              title="airplane image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                MyName: {user.username}
              </Typography>
            </CardContent>
            <h5>
              Change profile picture:
              <input
                type="file"
                name="image"
                placeholder="change profile pic"
                value={image}
                onChange={(ev) => changeImage(ev, ev.target.files[0])}
              />
            </h5>
          </div>
          <h1>Favorite images</h1>
          {user.myLikes.map((flight) => {
            return (
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={flight.username}
                    height="140"
                    image={flight.image}
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
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      postedby:{flight.postedBy.username}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
          <h1 className={classes.root}>My posted images</h1>
          {user.myPosts.map((flight) => {
            return (
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={flight.username}
                    height="140"
                    image={flight.image}
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
                    {/* <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      postedby:{flight.postedBy}
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
