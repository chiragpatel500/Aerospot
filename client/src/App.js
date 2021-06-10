import React from "react";
import "./App.css";
import ListScreen from "./components/ListScreen";
import Navbar from "./components/Navbar";
import ReturnButton from "./components/ReturnButton";
import Home from "./components/Home";
import Details from "./components/Details";
import Login from "./components/Login";
import Register from "./components/Register";
import MyProfile from "./components/MyProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FlightsContextProvider } from "./context/flightsContext";

function App() {
  return (
    <FlightsContextProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/ListScreen ">
              <ListScreen />
            </Route>
            <Route exact path="/Details">
              <Details />
            </Route>
            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/Register">
              <Register />
            </Route>
            <Route exact path="/MyProfile">
              <MyProfile />
            </Route>
          </Switch>
          <ReturnButton />
        </div>
      </Router>
    </FlightsContextProvider>
  );
}

export default App;
