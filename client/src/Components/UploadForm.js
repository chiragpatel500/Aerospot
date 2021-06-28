import React from "react";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const UpLoadForm = () => {
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [route, setRoute] = useState("");
  const [built, setBuilt] = useState("");
  const history = useHistory();
   
  useEffect(() => {
     if (url) {
       fetch("/UploadForm", {
         method: "post",
         headers: {
           "Content-Type": "application/json",
           Authorization: "Bearer " + localStorage.getItem("jwt"),
         },
         body: JSON.stringify({
           type,
           route,
           built,
           image: url,
         }),
       })
         .then((res) => res.json())
         .then((data) => {
           if (data.error) {
             console.log(err);
           } else {
             console.log("posted success fully");
             history.push("/");
           }
         })
         .catch((err) => {
           console.log(err);
         });
     }
   }, [url]);
  
  const PostDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "aerospot");
    data.append("cloud_name", "chiragpatel500");
    fetch("	https://api.cloudinary.com/v1_1/chiragpatel500/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
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
          onChange={(e) => setImage(e.target.files[0])}
        />
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
        <button onClick={() => PostDetails()}>Submit</button>
      </form>
    </div>
  );
};

export default UpLoadForm;
