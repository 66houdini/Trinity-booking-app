/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  // we add this because rhe usercontext is delayed by few milliseconds, so it redirects us to login page
  const [ready, setReady] = useState(false);
  //get the user profile to remian logged in
  useEffect(() => {
    if (!user) {
      const {data} = axios.get("/profile").then(({data}) => {
        setUser(data);
        setReady(true);
      });
      
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready}}>
      {children}
    </UserContext.Provider>
  );
}
