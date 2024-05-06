import { useContext, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { styled } from 'baseui';
import { styled as styled2 } from 'styled-components';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { Card, StyledBody } from "baseui/card";
import { Block } from "baseui/block";
import {
  HeadingXSmall
} from "baseui/typography";

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
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',

  '@media (max-width: 400px)': {
    width: '250px', 
    padding: '0', 
  },

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
        <div className="a">
          <div className="contain__buttons">
            <div style={{ display: 'flex', flexWrap: 'wrap' }} >
              <Block >
                <Card overrides={{
                  Root: {
                    style: {
                      width: "auto", backgroundColor: "#EA6607", border: '1px solid #ECECEC',
                      borderRadius: '8px',
                    }
                  }
                }}>
                  <HeadingXSmall ></HeadingXSmall>
                  <StyledBody>
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
                  </StyledBody>
                </Card>
              </Block>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};