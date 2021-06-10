// import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";
import ListScreen from "./components/ListScreen";
import Navbar from './components/Navbar';
import ReturnButton from './components/ReturnButton';
import Home from './components/Home';
import Details from './components/Details';
import Login from './components/Login';
import Register from './components/Register';
import MyProfile from './components/MyProfile';

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
