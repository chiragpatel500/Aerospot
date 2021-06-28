import React, { useState } from "react";
import { AuthContext } from "../context/authContext";

const UpLoadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [type, setType] = useState("");
  const [route, setRoute] = useState("");
  const [built, setBuilt] = useState("");
  const submitForm = () => {};

  return (
    <div className="UpLoadForm">
      <form
        style={
          ({ marginTop: "30%" },{ display:"grid"})
        }
      >
        <input
          type="file"
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <label>
          Type:
          <input
            type="text"
            name="type"
            onChange={(e) => setType(e.target.value)}
          />
        </label>
        <label>
          Route:
          <input
            type="text"
            name="route"
            onChange={(e) => setRoute(e.target.value)}
          />
        </label>
        <label>
          Built:
          <input
            type="text"
            name="built"
            onChange={(e) => setBuilt(e.target.value)}
          />
        </label>
        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
};

export default UpLoadForm;
