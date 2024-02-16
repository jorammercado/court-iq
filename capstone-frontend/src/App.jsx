import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";
import { StatefulInput } from "baseui/input";

const engine = new Styletron();

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

import "./App.css";
import { LoginPage } from "./Pages/LoginPage.jsx";
import { UserProvider } from "./Providers/UserProvider";
import { LoggedInPage } from "./Pages/LoggedInPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MemoGoogleMap } from "./Components/googleMap/GoogleMap.jsx"
import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import NavBar from "./Components/NavBar";

import FourOFour from "./Pages/FourOFour";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [currentUserPlaces, setCurrentUserPlaces] = useState(null);
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        {/* <Centered> */}

        <div className="App">
          <header className="App-header"></header>
          <UserProvider>
            <Router>

              <div>
                <NavBar currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  photoURL={photoURL}
                  setPhotoURL={setPhotoURL} />
              </div>

              <Routes>

                {/* public route login */}
                <Route path="/"
                  element={
                    <PublicRoute
                      element={LoginPage}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}
                      currentUserPlaces={currentUser}
                      setCurrentUserPlaces={setCurrentUserPlaces}
                    />
                  }
                />

                {/* private route - home screen of specific user */}
                <Route
                  path="/loggedInPage"
                  element={
                    <ProtectedRoute
                      element={LoggedInPage}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      currentUserPlaces={currentUser}
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}
                      setCurrentUserPlaces={setCurrentUserPlaces}
                    />
                  }
                />

                {/* private route - home screen of specific user */}
                <Route
                  path="/maps"
                  element={
                    <ProtectedRoute
                      element={MemoGoogleMap}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      currentUserPlaces={currentUserPlaces}
                      setCurrentUserPlaces={setCurrentUserPlaces}
                    />
                  }
                />

                {/* public route - page not found */}
                <Route
                  path="*"
                  element={
                    <PublicRoute
                      element={FourOFour}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

              </Routes>
            </Router>
          </UserProvider>

        </div>
        {/* </Centered> */}
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
