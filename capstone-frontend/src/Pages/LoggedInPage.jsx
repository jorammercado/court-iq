import { useContext, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Services/FireBase";
import { useState } from "react";
import SVG from 'react-inlinesvg';
import "./LoggedInPage.scss";
import "animate.css";


export const LoggedInPage = ({ currentUser,
  setCurrentUser,
  setPhotoURL,
  photoURL }) => {
  const [clearMessage, setClearMessage] = useState(false);
  const [avatarSimple, setAvatarSimple] = useState(true);

  const imgStyle = {
    width: '30vh',
    height: '30vh'
  };
  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      setCurrentUser(null);
      navigate("/");
    }
  }, [user, navigate]);


  const handleLogout = async () => {
    setCurrentUser(null)
    setPhotoURL(null)
    logOut();
    alert("you've been logged out");
  };

  if (user) {
    return (
      <div className="logged-in">
        {!clearMessage ?
          <div className="animate__animated animate__fadeInDown">
            {user.displayName !== "guest" ? <h1> Log In Success!  </h1> : ""}
            <h2>Welcome {user.displayName} </h2>
            <div className="image">
              {!/[<>]/.test(photoURL) ?
                <img src={photoURL}
                  style={imgStyle}
                  className="user-image"
                  alt="its the users head"
                ></img>
                : avatarSimple ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="146" height="146" fill="currentColor" className="bi bi-file-person" viewBox="0 0 16 16">
                    <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg> :
                  <SVG
                    src={photoURL}
                    width={128}
                    length="auto"
                    title="avatar"
                  />
              }
            </div>
            <h3 className="email">
              {user.email !== "guest@courtiq.com" ? `Email: ${user.email}` : "Browse ad libitum"}
            </h3>
            <br></br>
            <button className="btn btn-dark btn-lg" onClick={handleLogout}>
              Log Out
            </button>
          </div> : null}
      </div>
    );
  } else
    return (
      <div className="not-logged-in"> NOT LOGGED IN </div>
    );
};