import "./NavBar.scss";
import { useNavigate, Link } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import { useStyletron } from "baseui";
import { AppNavBar } from "baseui/app-nav-bar";
import logo3 from "../assets/logo3.png"
import ball from "../assets/BALL.svg"
import { Input } from 'baseui/input';
import ChatApp from "./ChatApp";
import {
    ChevronDown,
    Delete,
    Overflow,
    Upload
} from "baseui/icon";

export default function NavBar({ currentUser,
    photoURL,
    isSearchVisible,
    setIsSearchVisible }) {
    const [css] = useStyletron();
    const navigate = useNavigate();

    const mainItems = React.useMemo(() => [
        { icon: null, label: 'Glossary' },
        { icon: null, label: 'League Leaders' },
        { icon: null, label: 'Rosters' },
        { icon: null, label: 'Standings' },
        { icon: null, label: 'Schedule' },
        { icon: null, label: 'Comparate' },
        { icon: null, label: 'Search' },
    ], []);

    const userItems = React.useMemo(() => [
        { icon: null, label: 'Home' },
        { icon: null, label: 'User' },
    ], []);

    function handleMainItemSelect(item) {
        switch (item.label) {
            case "League Leaders":
                setIsSearchVisible(false)
                navigate("/Search");
                break;
            case "Rosters":
                setIsSearchVisible(false)
                navigate("/rosters");
                break;
            case "Standings":
                setIsSearchVisible(false)
                navigate("/teamstandings");
                break;
            case "Schedule":
                setIsSearchVisible(false)
                navigate("/GamesSchedule");
                break;
            case "Comparate":
                setIsSearchVisible(false)
                navigate("/PlayerComparation");
                break;
            case "Search":
                setIsSearchVisible(!isSearchVisible);
                break;
            default:
                setIsSearchVisible(false)
                // Handle default case or do nothing
                break;
        }
    }

    function handleUserItemSelect(item) {
        switch (item.label) {
            case "User":
                setIsSearchVisible(false)
                navigate("/loggedInPage"); // Update this route as needed
                break;
            case "Home":
                setIsSearchVisible(false)
                navigate("/");
                break;
            case "Search":
                setIsSearchVisible(!isSearchVisible);
                break;
            default:
                setIsSearchVisible(false)
                // Handle default case or do nothing
                break;
        }
    }

    const handleLogoClick = () => {
        setIsSearchVisible(false)
        navigate("/");
    };

    const handleLogoUserClick = () => {
        setIsSearchVisible(false)
        navigate("/loggedInPage");
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
                usernameSubtitle={<Link to="/loggedInPage" onClick={handleLogoUserClick} style={{
                    display: 'inline-block',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                }}>
                    <span aria-hidden="true" style={{
                        visibility: 'hidden',
                        height: 0,
                    }}>
                        Invisible Link
                    </span>
                </Link>
                }
                userImgUrl={
                    !/[<>]/.test(photoURL) && currentUser
                        ? photoURL
                        : ball
                }
            />
            {isSearchVisible &&
                <div style={{
                    position: 'fixed',
                    top: '100',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    zIndex: '1000',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}
                    onClick={() => setIsSearchVisible(false)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <ChatApp />
                    </div>
                </div>
            }
        </div>
    );
}
