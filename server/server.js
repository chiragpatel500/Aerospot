const express = require("express");
const mongoose = require("mongoose");
const mongoURI = require("./config.js").mongoURI;const app = express();
const cors = require("cors");

//initialize express app
const app = express();
const port = process.env.PORT || 5000;

//connect to DB
mongoose
    .connect(mongoURI, { useNewurlPraser: true, useCreateIndex: true })
    .then(() => console.log("Connection to Mongo DB established"))
    .catch((err) => console.log(err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Aerospot Backend");
  console.log("Server is running on " + port + "port");
});
