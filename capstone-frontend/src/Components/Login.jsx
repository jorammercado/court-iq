import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { ButtonDock } from "baseui/button-dock";
import { Button, KIND } from "baseui/button";
import { styled } from 'baseui';
import { styled as styled2 } from 'styled-components';
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

const Wrapper = styled2.div`
    @media only screen and (max-width : 399px) {
        width: 10%
    }
`

const StyledButtons = styled('div', {
  position: 'flex',
  width: '375px',
  padding: '20px',
  border: '1px solid #ECECEC',
  borderRadius: '12px',
  backgroundColor: '#585858',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',

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

            <div style={{ display: 'flex', flexWrap: 'wrap' }} >
              <Wrapper>
                <StyledButtons>

                <div className="login__button">
                    <GoogleLoginButton onClick={signInWithGoogle} className="animate__animated animate__fadeInUp">
                    </GoogleLoginButton>
                  </div>

                  <div className="login__button">
                    <FacebookLoginButton onClick={handleSignInWithFacebook} className="animate__animated animate__fadeInUp">
                    </FacebookLoginButton>
                  </div>

                  <button onClick={() => {  }}
                    className="btn btn-light btn-lg login__button animate__animated animate__fadeInUp" style={{ borderRadius: '3px', margin: '4px' }}>
                    Log in with Email
                  </button>

                  <button onClick={() => {  }}
                    className="btn btn-light btn-lg login__button animate__animated animate__fadeInUp" style={{ borderRadius: '3px', margin: '4px' }}>
                    Sign Up!
                  </button>

                </StyledButtons>
              </Wrapper>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};