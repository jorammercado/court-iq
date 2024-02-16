import { useContext, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Services/FireBase";
import { useState } from "react";
import "./LoggedInPage.css";
import "animate.css";


export const LoggedInPage = ({ currentUser,
  setCurrentUser,
  currentUserPlaces,
  setCurrentUserPlaces,
  photoURL }) => {
  const [clearMessage, setClearMessage] = useState(false);

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
    logOut();
    alert("you've been logged out");
  };
  const handleOk = (event) => {
    event.preventDefault();
    navigate("/maps");
  };
  if (user) {
    return (
      <div className="logged-in">
        {!clearMessage ?
          <div className="animate__animated animate__fadeInDown">
            <h1> Log In Success!  </h1>
            <h2>Welcome {user.displayName} </h2>
            <div className="image">
              <img src={photoURL}
                style={imgStyle}
                className="user-image"
                alt="its the users head"
              ></img>
            </div>
            <h3 className="email">
              Email: {user.email}
            </h3>
            <br></br>
            <button className="btn btn-dark btn-lg" onClick={handleLogout}>
              Log Out
            </button>
            <button className="btn btn-dark btn-lg" onClick={handleOk}>
              Browse Site
            </button>
          </div> : null}
      </div>
    );
  } else
    return (
      <div className="not-logged-in"> NOT LOGGED IN </div>
    );
};