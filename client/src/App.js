// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [flights, setflights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/flights/all")
      .then((res) => res.json())
      .then((data) => setflights(data));
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          teach react
        </a>
      </header> */}
      <h1>flights to and from</h1>
      {flights.length &&
        flights.map((flight) => (
          <div key={flight._id}>
            <h2>
              <strong>{flight.airline}€ per day easy</strong>
            </h2>
            <p>{flight.type}</p>
          </div>
        ))}


    </div>
  );
}

export default App;
