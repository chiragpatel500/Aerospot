import React from 'react';
import { useEffect, useState } from "react";

function ListScreen() {
    const [flights, setflights] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/flights/all")
            .then((res) => res.json())
            .then((data) => setflights(data));
    }, []);
    return (
        <div>
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
    )
}

export default ListScreen;
