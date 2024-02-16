import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, getAuth, signOut, FacebookAuthProvider } from "firebase/auth";
import {
  signInWithGoogle,
  logOut,
  signInWithFacebook,
  auth,
  facebookAuth
} from "../Services/FireBase";
import "./Login.css";
import "animate.css";

export const Login = ({ currentUser,
  setCurrentUser,
  photoURL,
  setPhotoURL
}) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setPhotoURL(user.photoURL);
      setCurrentUser(user);
      navigate("/loggedInPage");
    }
  }, [user, navigate]);

  const handleSignInWithFacebook = () => {
    try {
      //the signInWithPopUp() method accepts ANY provider we create. This is all our authentication logic
      signInWithPopup(auth, facebookAuth).then((result)=>{
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // fetch facebook graph api to get user actual profile picture
        fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
        .then((response)=>response.blob())
        .then((blob)=>{
          setPhotoURL(URL.createObjectURL(blob));
        })
      }).catch((err)=>{
        console.log(err);
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login buttons">
      <section>
        <div className="login">
          <button className="btn btn-dark btn-lg animate__animated animate__rotateIn" onClick={signInWithGoogle}>Sign in With google</button>
          <button className="btn btn-dark btn-lg animate__animated animate__rotateIn" onClick={handleSignInWithFacebook}>Sign in With facebook</button>
          <button className="btn btn-dark btn-lg animate__animated animate__rotateIn" onClick={() => { navigate("/signup") }}>Sign up!</button>
        </div>
      </section>

    </div>
  );
};