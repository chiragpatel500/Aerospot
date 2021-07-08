import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  main: {
    backgroundImage: `url("https://i.ytimg.com/vi/lmWt0Icl2kM/maxresdefault.jpg")`,
    height: "100vh",
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



  useEffect(() => {
    
  }, []);

  

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
          <p>Profile Picture:</p>
          <img src={user.image} alt="user profile" />
          <h2>MyName: {user.username}</h2>
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
          Favorite images:
          {user.myLikes.map((flight) => {
            return <img src={flight.image} alt={flight.username} />;
          })}
          My posted images:
          {user.myPosts.map((flight) => {
            return <img src={flight.image} alt={flight.username} />;
          })}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
