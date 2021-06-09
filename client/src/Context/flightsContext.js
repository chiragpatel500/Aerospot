// 1.import the modules
import React, { createContext, useState, useEffect } from 'react';


//2.inititalize the context
const initFlightsContext = {
    flights: []
};

//3. create context
export const FlightsContext = createContext(initFlightsContext);

//4.make provider =>value/ children 
export const flightsContextProvider = ({ children }) => {
    const [flights, setFlights] = useState(initFlightsContext.flights);
    console.log(flights);
    return (
        <FlightsContext.Provider value={{ flights, setFlights }}>
            {children}
        </FlightsContext.Provider>
    )
};