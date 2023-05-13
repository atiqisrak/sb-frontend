"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [localLoggedIn, setLocalLoggedIn] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = JSON.parse(localStorage.getItem("loggedIn"));
    // console.log("loggedInStatus: ", loggedInStatus);
    if (loggedInStatus == null || loggedInStatus == false) {
      setLoggedIn(false);
      localStorage.setItem("loggedIn", false);
      console.log("Login status 1: ", loggedIn);
    } else if (loggedInStatus == true) {
      setLoggedIn(true);
      localStorage.setItem("loggedIn", true);
      console.log("Login status 2: ", loggedIn);
    }
  }, [setLoggedIn]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setLoggedIn(true);
    // setLocalLoggedIn(true);
    localStorage.setItem("loggedIn", true);

    console.log("Login status 3: ", loggedIn);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedIn(false);
    // console.log("Signed in globally.");
    // setLocalLoggedIn(false);
    localStorage.setItem("loggedIn", false);
    // console.log("Signed in locally.");

    console.log("Login status 4: ", loggedIn);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        localLoggedIn,
        setLocalLoggedIn,
        isAuthenticated,
        setIsAuthenticated,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
