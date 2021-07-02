import React from "react";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const UpLoadForm = () => {
  const [image, setImage] = useState("");
  const [airline, setAirline] = useState("");
  const [type, setType] = useState("");
  const [route, setRoute] = useState("");
  const [built, setBuilt] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();

  const uploadPicture = (e) => {
    e.preventDefault();
    if (url) {
      fetch("http://localhost:5000/upload/flights", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          type,
          airline,
          flightroute: route,
          built,
          image: url,
        }),
      })
        .then((res) => {
          console.log(`res`, res);
          return res.json();
        })
        .then((data) => {
          console.log("posted success fully", data);
          history.push("/ListScreen");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const PostDetails = (ev, file) => {
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
    <div className="UpLoadForm">
      <form style={({ marginTop: "30%" }, { display: "grid" })}>
        <input
          type="file"
          name="image"
          value={image}
          onChange={(ev) => PostDetails(ev, ev.target.files[0])}
        />
        <img src={url} alt=""/>
        <label>
          Airline:
          <input
            type="text"
            name="type"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </label>
        <label>
          Route:
          <input
            type="text"
            name="route"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          />
        </label>
        <label>
          Built:
          <input
            type="text"
            name="built"
            value={built}
            onChange={(e) => setBuilt(e.target.value)}
          />
        </label>
        <button onClick={(e) => uploadPicture(e)}>Submit</button>
      </form>
    </div>
  );
};

export default UpLoadForm;
