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
import GamesSchedule from "./Pages/GamesSchedule.jsx";
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
import { MemoGoogleMap } from "./Components/googleMap/GoogleMap.jsx";
import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import NavBar from "./Components/NavBar";

import Home from "./Pages/Home.jsx";
import TeamsPage from "./Pages/TeamsPage.jsx";

import PlayerExamplePage from "./Pages/PlayerExamplePage.jsx";

import TeamStandingsV2 from "./Pages/TeamStandingsV2.jsx";

import PlayerStatsTableVariation from "./Pages/PlayerStatsTableVariation.jsx";

import SearchPage from "./Components/SearchPage.jsx";

import FourOFour from "./Pages/FourOFour";
import "bootstrap/dist/css/bootstrap.min.css";
import PLayerComparation from "./Pages/PLayerComparation.jsx";
import Headlines from "./Pages/Headlines.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [currentUserPlaces, setCurrentUserPlaces] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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
                  isSearchVisible={isSearchVisible}
                  setIsSearchVisible={setIsSearchVisible}
                  isGlossaryVisible={isGlossaryVisible}
                  setIsGlossaryVisible={setIsGlossaryVisible}
                />
              </div>

              <Routes>
                {/* public route login */}
                <Route
                  path="/"
                  element={
                    <Home
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      photoURL={photoURL}
                      setPhotoURL={setPhotoURL}
                      currentUserPlaces={currentUser}
                      setCurrentUserPlaces={setCurrentUserPlaces}
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
                    <MemoGoogleMap
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      currentUserPlaces={currentUser}
                      Places
                      setCurrentUserPlaces={setCurrentUserPlaces}
                    />
                  }
                />

                {/* private route - home screen of specific user */}
                <Route
                  path="/rosters"
                  element={
                    <TeamsPage
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      isSearchVisible={isSearchVisible}
                      setIsSearchVisible={setIsSearchVisible}
                    />
                  }
                />
                <Route
                  path="/player/:playerid"
                  element={
                    <PlayerExamplePage
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                      isSearchVisible={isSearchVisible}
                      setIsSearchVisible={setIsSearchVisible}
                    />
                  }
                />
                <Route path="/Search" element={<SearchPage />} />

                <Route
                  path="/teamstandings"
                  element={
                    <TeamStandingsV2
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                <Route
                  path="/GamesSchedule"
                  element={
                    <GamesSchedule
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                <Route
                  path="/PlayerComparation"
                  element={
                    <PLayerComparation
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />
                <Route
                  path="/HeadLine"
                  element={
                    <Headlines
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                <Route
                  path="/player_stats_table"
                  element={
                    <PlayerStatsTableVariation
                      currentUser={currentUser}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />

                {/* public route - page not found */}
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
