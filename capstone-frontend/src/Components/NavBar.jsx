import "./NavBar.scss";
import { useNavigate, Link } from "react-router-dom";
import * as React from "react";
import { useState, useEffect } from "react";
import { useStyletron } from "baseui";
import { AppNavBar, setItemActive, mapItemsActive } from "baseui/app-nav-bar";
import logo3 from "../assets/logo3.png";
import ball from "../assets/BALL.svg";
import { Input } from "baseui/input";
import ChatApp from "./ChatApp";
import { ChevronDown, Delete, Overflow, Upload, Search } from "baseui/icon";
import TeamStatsGlossary from "../Components/TeamStatsGlossary";


export default function NavBar({
    currentUser,
    photoURL,
    isSearchVisible,
    setIsSearchVisible,
    isGlossaryVisible,
    setIsGlossaryVisible,
}) {
    const [css] = useStyletron();
    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [mainItems, setMainItems] = useState([
        // { icon: null, label: "League Leaders" },
        { icon: null, label: "Rosters" },
        { icon: null, label: "Standings" },
        { icon: null, label: "Compare" },
        { icon: null, label: "Headlines" },
    ]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            updateMainItems(window.innerWidth);
        };

        updateMainItems(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [screenWidth]);

    const updateMainItems = (width) => {
        const items = [
            // { icon: null, label: "League Leaders" },
            { icon: null, label: "Rosters" },
            { icon: null, label: "Standings" },
            // { icon: null, label: "Compare" },
            { icon: null, label: "Headlines" },
            { icon: null, label: "Glossary" },
        ];

        if (width >= 1136) {
            items.unshift({ icon: null, label: "Search", id: "search" }); 
        }

        setMainItems(items);
    };

    const userItems = [
        { icon: null, label: "Home" },
        { icon: null, label: "User" },
    ]


    function handleMainItemSelect(item) {
        switch (item.label) {
            // case "League Leaders":
            //     setIsSearchVisible(false);
            //     setIsGlossaryVisible(false);
            //     navigate("/Search");
            //     break;
            case "Rosters":
                setIsSearchVisible(false);
                setIsGlossaryVisible(false);
                navigate("/rosters");
                break;
            case "Standings":
                setIsSearchVisible(false);
                setIsGlossaryVisible(false);
                navigate("/teamstandings");
                break;
            case "Schedule":
                setIsSearchVisible(false);
                setIsGlossaryVisible(false);
                navigate("/GamesSchedule");
                break;
            case "Compare":
                setIsSearchVisible(false);
                setIsGlossaryVisible(false);
                navigate("/PlayerComparation");
                break;
            case "Headlines":
                setIsSearchVisible(false);
                setIsGlossaryVisible(false);
                navigate("/HeadLine");
                break;
            case "Search":
                setIsGlossaryVisible(false);
                setIsSearchVisible(!isSearchVisible);
                break;
            case "Glossary":
                setIsGlossaryVisible(!isGlossaryVisible);
                setIsSearchVisible(false);
                break;
            default:
                setIsGlossaryVisible(false);
                setIsSearchVisible(false);
                break;
        }
    }

    function handleUserItemSelect(item) {
        switch (item.label) {
            case "User":
                setIsGlossaryVisible(false);
                setIsSearchVisible(false);
                navigate("/loggedInPage");
                break;
            case "Home":
                setIsGlossaryVisible(false);
                setIsSearchVisible(false);
                navigate("/");
                break;
            case "Glossary":
                setIsGlossaryVisible(!isGlossaryVisible);
                setIsSearchVisible(false);
                break;
            default:
                setIsGlossaryVisible(false);
                setIsSearchVisible(false);
                break;
        }
    }

    const handleLogoClick = () => {
        setIsGlossaryVisible(false);
        setIsSearchVisible(false);
        navigate("/");
    };

    const handleLogoUserClick = () => {
        setIsGlossaryVisible(false);
        setIsSearchVisible(false);
        navigate("/loggedInPage");
    };

    return (
        <div >
            <AppNavBar
                title={
                    <div onClick={handleLogoClick} style={{ cursor: "pointer" }}>
                        <img src={logo3} alt="logo" height="35px" />
                        Court IQ
                    </div>
                }
                mainItems={mainItems}
                userItems={userItems}
                mapItemToNode={(item) => {
                    if (item.id === "search" && screenWidth >= 1136) {
                        return (
                            <div className="above-chatt">
                                <ChatApp />
                            </div>
                        );
                    }
                    else if (item.id === "search") return ""
                    return item.label;
                }}
                onMainItemSelect={handleMainItemSelect}
                onUserItemSelect={handleUserItemSelect}
                overrides={{
                    Root: {
                        style: ({ $theme }) => ({
                            // backgroundColor: "#EA6607"
                            // backgroundColor: "#202020"
                        })
                    },
                    MainMenuItem: {
                        style: ({ $theme }) => ({
                            outline: `none`,
                            // color: "blue"
                            // backgroundColor: $theme.colors.warning600
                        })
                    }
                }}
                username={currentUser ? currentUser.displayName : "User"}
                usernameSubtitle={
                    <Link
                        to="/loggedInPage"
                        onClick={handleLogoUserClick}
                        style={{
                            display: "inline-block",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                        }}
                    >
                        <span
                            aria-hidden="true"
                            style={{
                                visibility: "hidden",
                                height: 0,
                            }}
                        >
                            Invisible Link
                        </span>
                    </Link>
                }
                userImgUrl={!/[<>]/.test(photoURL) && currentUser ? photoURL : ball}
            />
            {isGlossaryVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        zIndex: "1000",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={() => setIsGlossaryVisible(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxHeight: "80%",
                            overflowY: "auto",
                            width: "60%",
                            backgroundColor: "#faf7f2",
                            padding: "25px",
                            borderRadius: "3px",
                        }}
                    >
                        <TeamStatsGlossary />
                    </div>
                </div>
            )}
        </div>

    );
}
