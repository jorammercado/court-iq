import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { ButtonDock } from "baseui/button-dock";
import { Button, KIND } from "baseui/button";
import { styled } from 'baseui';
import { styled as styled2 } from 'styled-components';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

import {
  signInWithGoogle,
  signInAnon,
  signInWithFacebook
} from "../Services/FireBase";
import "./Login.scss";
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
  paddingLeft: "10px",
  paddingRight: "10px",
  border: '1px solid #ECECEC',
  borderRadius: '4px',
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
                    <FacebookLoginButton onClick={signInWithFacebook} className="animate__animated animate__fadeInUp">
                    </FacebookLoginButton>
                  </div>

                  <button onClick={signInAnon}
                    className="btn btn-light btn-lg login__button animate__animated animate__fadeInUp" style={{ borderRadius: '3px', margin: '4px' }}>
                    Continue as Guest
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