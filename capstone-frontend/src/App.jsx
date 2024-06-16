import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import {
  LightTheme,
  BaseProvider,
  styled,
  DarkTheme,
  ThemeProvider,
} from "baseui";
import { StatefulInput } from "baseui/input";
const engine = new Styletron();
const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

import "./App.scss";
import { LoginPage } from "./Pages/LoginPage.jsx";
import { UserProvider } from "./Providers/UserProvider";
import { LoggedInPage } from "./Pages/LoggedInPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { MemoGoogleMap } from "./Components/googleMap/GoogleMap.jsx";
import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home.jsx";
import NBATeams from "./Pages/NBATeams.jsx";
import WNBATeams from "./Pages/WNBATeams.jsx";
import PlayerPage from "./Pages/PlayerPage.jsx";
import TeamStandings from "./Pages/TeamStandings.jsx";
import FourOFour from "./Pages/FourOFour";
import "bootstrap/dist/css/bootstrap.min.css";
import PlayerComparison from "./Pages/PlayerComparison.jsx";
import Headlines from "./Pages/Headlines.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [isGlossaryVisible, setIsGlossaryVisible] = useState(false);
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        {/* <Centered> */}

        <div className="App">
          <header className="App-header"></header>
          <UserProvider>
            <Router>
              <div>
                <NavBar
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  photoURL={photoURL}
                  setPhotoURL={setPhotoURL}
                  isGlossaryVisible={isGlossaryVisible}
                  setIsGlossaryVisible={setIsGlossaryVisible}
                />
              </div>

              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}

                    />
                  }
                />

                <Route
                  path="/login"
                  element={
                    <PublicRoute
                      element={LoginPage}
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}
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
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}
                    />
                  }
                />

                {/* <Route
                  path="/maps"
                  element={
                    <MemoGoogleMap
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      Places
                    />
                  }
                /> */}

                <Route
                  path="/rostersWNBA"
                  element={
                    <WNBATeams
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      key={0}
                    />
                  }
                />

                <Route
                  path="/rostersNBA"
                  element={
                    <NBATeams
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      key={0}
                    />
                  }
                />

                <Route
                  path="/player/:playerid"
                  element={
                    <PlayerPage
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                <Route
                  path="/teamstandings"
                  element={
                    <TeamStandings
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                <Route
                  path="/playerComparison"
                  element={
                    <PlayerComparison
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />
                <Route
                  path="/Headlines"
                  element={
                    <Headlines
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                <Route
                  path="*"
                  element={
                    <FourOFour
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
}

export default App;
