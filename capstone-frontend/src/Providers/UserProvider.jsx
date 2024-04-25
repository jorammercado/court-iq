
import React, { useEffect, useState, createContext } from "react";
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import { auth } from "../Services/FireBase";
import { FacebookAuthProvider } from "firebase/auth";

export const UserContext = createContext(null);

const avatar = createAvatar(adventurer, {
  "seed": "Bandit"
});

const svg = avatar.toString();


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
        // if (/facebook/.test(photoURL)) {
        //   console.log(auth)
        //   const credential = FacebookAuthProvider.credentialFromResult(res);
        //   const accessToken = credential.accessToken;
        //   fetch(`https://graph.facebook.com/${auth.currentUser.uid}/picture?type=large&access_token=${auth.currentUser.accessToken}`)
        //     .then((response) => response.blob())
        //     .then((blob) => {
        //       photoURL = URL.createObjectURL(blob)
        //     })
        // }
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