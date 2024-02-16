import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { ButtonDock } from "baseui/button-dock";
import { Button, KIND } from "baseui/button";
import { styled } from 'baseui';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
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

const StyledTest = styled('div', {
  position: 'flex',
  width: '375px',
  height: '667px',
  border: '1px solid #ECECEC',
  borderRadius: '12px',
  backgroundColor: '#ECECEC',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

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
      signInWithPopup(auth, facebookAuth).then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        // fetch facebook graph api to get user actual profile picture
        fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
          .then((response) => response.blob())
          .then((blob) => {
            setPhotoURL(URL.createObjectURL(blob));
          })
      }).catch((err) => {
        console.log(err);
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login">
      <section className="login__wrapper">
        <div className="animate__animated animate__fadeInUp">
          <div className="contain__buttons">
            <StyledTest>
              <ButtonDock className="login-button"
                primaryAction={[
                  <FacebookLoginButton onClick={handleSignInWithFacebook} kind={KIND.primary} key="second" className="animate__animated animate__fadeInUp login-button">
                  </FacebookLoginButton>,

                  <GoogleLoginButton onClick={signInWithGoogle} kind={KIND.primary} key="first" className="animate__animated animate__fadeInUp login-button">
                  </GoogleLoginButton>,

                  <Button onClick={() => { navigate("/signup") }} kind={KIND.secondary} key="third"
                    className="animate__animated animate__fadeInUp login-button">
                    Sign Up!
                  </Button>
                ]}
              />
            </StyledTest>

          </div>
        </div>




      </section>

    </div>
  );
};