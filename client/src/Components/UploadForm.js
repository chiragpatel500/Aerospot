import React, { useState } from "react";
import { AuthContext } from "../context/authContext";

const UpLoadForm = () => {
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const [route, setRoute] = useState("");
  const [built, setBuilt] = useState("");
  
  const PostDetails = () => {
    const data = newFormData();
    data.append("file", image);
    data.append("upload_preset", "aerospot");
    data.append("cloud_name", "chiragpatel500");
    fetch("	https://api.cloudinary.com/v1_1/chiragpatel500/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
