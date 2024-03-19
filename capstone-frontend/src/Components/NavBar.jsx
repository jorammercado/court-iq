import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { Layer } from "baseui/layer";
import {
    ChevronDown,
    Delete,
    Overflow,
    Upload,
    Blank,
    Search,
    TriangleRight,
    CheckIndeterminate,
    ChevronLeft,
    ArrowRight,
    ChevronRightSmall,
    ChevronRight,
} from "baseui/icon";
import { StyledLink } from "baseui/link";
import {
    AppNavBar,
    setItemActive,
    mapItemsActive,
    NavItem,
} from "baseui/app-nav-bar";
import { Avatar } from "baseui/avatar";
import logoWhite from "../assets/logo_white.png"
import logoOrange from "../assets/logo_orange_white.svg"
import svg from "../assets/react.svg"
import logovar2 from "../assets/LOGOINCOLOR2.svg"
import logo from "../assets/logo.png"
import logo3 from "../assets/logo3.png"

export default function NavBar({ currentUser, setCurrentUser, photoURL }) {
    const [css] = useStyletron();
    const navigate = useNavigate();

    const [mainItems, setMainItems] = React.useState([
        { icon: Search, label: 'League Leaders' },
        {
            icon: ChevronDown,
            label: 'Players',
            navExitIcon: ChevronLeft,
            children: [
                { icon: Blank, label: 'Recently Searched' },
                { icon: Blank, label: 'Favorites' }
            ],
        },
        {
            icon: ChevronDown,
            label: 'Teams',
            navExitIcon: ChevronLeft,
            children: [
                { icon: Blank, label: 'Rosters' },
                { icon: Blank, label: 'Standings' },
                { icon: Blank, label: 'Stats' },
                { icon: Blank, label: 'Schedule' },
                { icon: Blank, label: "Comparate" }
            ],
        }
    ]);

    const [userItems, setUserItems] = React.useState([
        { icon: Blank, label: 'Home' },
        { icon: Blank, label: 'User' }
    ]);

    const [isNavVisible, setIsNavVisible] = React.useState(true);

    function handleMainItemSelect(item) {
        setMainItems((prev) => setItemActive(prev, item));
        if (item.label === "Maps") navigate("/maps");
        if (item.label === "Rosters") navigate("/conley_example");
        if (item.label === "test line chart 2") navigate("/chartLine");
        if (item.label === "conley") navigate("/conley_example");
        if (item.label === "Standings") navigate("/teamstandingsV2");
        if (item.label === "Schedule") navigate("/GamesSchedule");
        if (item.label === "RostersV2") navigate("/player_stats_table");
        if (item.label === "League Leaders") navigate("/Search");
        if (item.label === "Comparate") navigate("/PlayerComparation");
    }

    function handleUserItemSelect(item) {
        setUserItems((prev) => setItemActive(prev, item));
        setMainItems((prev) => setItemActive(prev, item));
        if (item.label === "User") navigate("/loggedInPage");
        if (item.label === "Home") navigate("/");
    }
    return (
        <div className="navbar__updated">
            <React.Fragment>
                {isNavVisible && (
                    <Layer>
                        <div
                            className={css({
                                boxSizing: "border-box",
                                width: "100vw",
                                position: "fixed",
                                top: "0",
                                left: "0",
                                right: "0"
                            })}
                        >
                            <AppNavBar
                                title={<div><img src={logo3} atl="logo" height="35px" />Court IQ</div>}
                                mainItems={mainItems}
                                userItems={userItems}
                                onMainItemSelect={handleMainItemSelect}
                                onUserItemSelect={(item) => handleUserItemSelect(item)}
                                username={currentUser ? currentUser.displayName : "User"}
                                usernameSubtitle="Pursuit Fellow"
                                userImgUrl={
                                    !/[<>]/.test(photoURL) && currentUser
                                        ? logoOrange
                                        : "https://api.dicebear.com/7.x/adventurer/svg?seed=Bandit"
                                }
                            />
                        </div>
                    </Layer>
                )}
            </React.Fragment>
        </div>
    );
}
