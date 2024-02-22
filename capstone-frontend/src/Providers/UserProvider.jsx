//  this PROVIDER will be responsible for reutrning the
//  functionality of our  FIREBASE SERVICE.
import React, { useEffect, useState, createContext } from "react";
import { Avatar } from "baseui/avatar";
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import { auth } from "../Services/FireBase";

export const UserContext = createContext(null);

const avatar = createAvatar(adventurer, {
  "seed": "Bandit"
});

const svg = avatar.toString();
//console.log(svg)

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        let { email, displayName, photoURL, uid } = user;
        if (email === null)
          email = "guest@courtiq.com"
        if (displayName === null)
          displayName = "guest"
        if (photoURL === null)
          photoURL = svg
        setUser({ email, displayName, photoURL, uid });
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