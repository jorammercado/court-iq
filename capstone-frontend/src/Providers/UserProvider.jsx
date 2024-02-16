//  this PROVIDER will be responsible for reutrning the
//  functionality of our  FIREBASE SERVICE.
import React, { useEffect, useState, createContext } from "react";
import { auth } from "../Services/FireBase";

export const UserContext = createContext(null);

    //     firstname: "",
    //     lastname: "",
    //     username: "",
    //     email: "",
    //     password: "",
    //     registration_date: "",
    //     displayname: "",
    //     photourl: ""

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { user_id, firstname, lastname, username, email, password, registration_date, displayName, photoURL, uid } = user;
        setUser({ user_id, firstname, lastname, username, email, password, registration_date, displayName, photoURL, uid });
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={user}>
      <div>{props.children}</div>
    </UserContext.Provider>
  );
};