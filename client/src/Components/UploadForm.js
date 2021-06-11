import React, { useState } from "react";
import Input from "@material-ui/core/Input";

const UpLoadForm = () => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const submitForm = () => {};
  return (
    <div className="UpLoadForm" style={{ marginTop: "50%" }}>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
};

export default UpLoadForm;
