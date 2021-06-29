// 1. import the modules
import React, { createContext, useState, useEffect } from "react";

// 2. initialize the context
const initAuthContext = {
  user: null,
  isLoggedIn: false,
};

// 3. create context

export const AuthContext = createContext(initAuthContext);

// 4. make provider => value / children
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(initAuthContext.user);
  const [isLoggedIn, setIsLoggedIn] = useState(initAuthContext.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      fetch("http://localhost:5000/users/MyProfile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
