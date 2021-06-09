// import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";
import ListScreen from "./components/ListScreen";
import Navbar from './components/Navbar';
import ReturnButton from './components/ReturnButton';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Home />
      
        <ListScreen />
  
      <login />

      <Register />
      
      <ReturnButton />
    </div>
  );
}

export default App;
