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
    <div className="App">
      <Navbar />

      <Home />
      
        <ListScreen />
  
      <Details />

      <Login />

      <Register />
      
      <MyProfile />
      <ReturnButton />
    </div>
  );
}

export default App;
