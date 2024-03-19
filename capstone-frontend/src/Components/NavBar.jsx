import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useStyletron } from "baseui";
import { AppNavBar } from "baseui/app-nav-bar";
import logo3 from "../assets/logo3.png"

export default function NavBar({ currentUser, photoURL }) {
    const [css] = useStyletron();
    const navigate = useNavigate();

    const mainItems = React.useMemo(() => [
        { icon: null, label: 'League Leaders' },
        { icon: null, label: 'Rosters' },
        { icon: null, label: 'Standings' },
        { icon: null, label: 'Schedule' },
        { icon: null, label: 'Comparate' },
    ], []);

    const userItems = React.useMemo(() => [
        { icon: null, label: 'Home' },
        { icon: null, label: 'User' }
    ], []);

    function handleMainItemSelect(item) {
        switch(item.label) {
            case "League Leaders":
                navigate("/Search");
                break;
            case "Rosters":
                navigate("/conley_example");
                break;
            case "Standings":
                navigate("/teamstandingsV2");
                break;
            case "Schedule":
                navigate("/GamesSchedule");
                break;
            case "Comparate":
                navigate("/PlayerComparation");
                break;
            default:
                // Handle default case or do nothing
                break;
        }
    }

    function handleUserItemSelect(item) {
        switch(item.label) {
            case "User":
                navigate("/loggedInPage"); // Update this route as needed
                break;
            case "Home":
                navigate("/");
                break;
            default:
                // Handle default case or do nothing
                break;
        }
    }

    const handleLogoClick = () => {
        navigate("/");
    };


    return (
        <div >
            <AppNavBar
                title={
                    <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        <img src={logo3} alt="logo" height="35px" />Court IQ
                    </div>
                  }
                mainItems={mainItems}
                userItems={userItems}
                onMainItemSelect={handleMainItemSelect}
                onUserItemSelect={handleUserItemSelect}
                username={currentUser ? currentUser.displayName : "User"}
                usernameSubtitle="Pursuit Fellow"
                userImgUrl={
                    !/[<>]/.test(photoURL) && currentUser
                        ? photoURL // assuming this is the correct photo URL for the user
                        : "https://api.dicebear.com/7.x/adventurer/svg?seed=Bandit"
                }
            />
        </div>
    );
}
