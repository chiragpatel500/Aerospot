require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoURI = require("./config.js").mongoURI;
const cors = require("cors");
const passport = require("passport");
const { jwtStrategy } = require("./passport");
//initialize express app
const app = express();
const port = process.env.PORT || 5000;

console.log(mongoURI);
//connect to DataBase
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/flights", require("./routes/flights"));
app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log("Aerospot Backend");
  console.log("Server is running on " + port + "port");
});
