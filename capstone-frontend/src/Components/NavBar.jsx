
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { Layer } from 'baseui/layer';
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
    ChevronRight
} from 'baseui/icon';
import { StyledLink } from "baseui/link";
import {
    AppNavBar,
    setItemActive,
    mapItemsActive,
    NavItem,
} from 'baseui/app-nav-bar';

export default function NavBar({ currentUser, setCurrentUser, photoURL }) {
    const [css] = useStyletron();
    const navigate = useNavigate();

    const [mainItems, setMainItems] = React.useState([
        { icon: Search, label: 'Search' },
        {
            icon: ChevronDown,
            label: 'Players',
            navExitIcon: ChevronLeft,
            children: [
                { icon: CheckIndeterminate, label: 'Players' },
                { icon: CheckIndeterminate, label: 'Favorites' },
                { icon: CheckIndeterminate, label: 'Recently Searched' },
                { icon: CheckIndeterminate, label: 'conley_example' }
            ],
        },
        {
            icon: ChevronDown,
            label: 'Teams',
            navExitIcon: ChevronLeft,
            children: [
                { icon: CheckIndeterminate, label: 'Standings' },
                { icon: CheckIndeterminate, label: 'StandingsV2' },
                { icon: CheckIndeterminate, label: 'Schedule' },
                { icon: CheckIndeterminate, label: 'Stats' }
            ],
        },
        {
            icon: ChevronDown,
            label: 'Maps',
            navExitIcon: ChevronLeft,
            children: [
                { icon: CheckIndeterminate, label: 'Bars' },
                { icon: CheckIndeterminate, label: 'Stadiums' },
                { icon: CheckIndeterminate, label: 'Restaurants' }
            ],
        },
        {
            icon: ChevronDown,
            label: 'Prop Predictor',
            navExitIcon: ChevronLeft,
            children: [
                {
                    icon: ChevronDown,
                    label: 'Secondary E',
                    navExitIcon: ChevronLeft,
                    children: [
                        {
                            icon: CheckIndeterminate,
                            label: 'Tertiary A',
                            navExitIcon: ChevronLeft,
                        },
                        { icon: CheckIndeterminate, label: 'Tertiary B' },
                    ],
                },
                { icon: Upload, label: 'Secondary F' },
            ],
        },
    ]);

    const [userItems, setUserItems] = React.useState([
        { icon: ChevronRight, label: 'User' },
        { icon: ChevronRight, label: 'Account item2' },
        { icon: ChevronRight, label: 'Account item3' },
        { icon: ChevronRight, label: 'Account item4' },
    ]);

    const [isNavVisible, setIsNavVisible] = React.useState(true);

    function handleMainItemSelect(item) {
        setMainItems((prev) => setItemActive(prev, item));
        if (item.label === "Maps")
            navigate('/maps');
        if (item.label === "conley_example")
            navigate('/conley_example');
        if (item.label === "test line chart 2")
            navigate('/chartLine');
        if (item.label === "conley")
            navigate('/conley_example');
        if (item.label === "Standings")
            navigate('/teamstandings');
        if (item.label === "StandingsV2")
            navigate('/teamstandingsV2');
    }

    function handleUserItemSelect(item) {
        setUserItems((prev) => setItemActive(prev, item));
        setMainItems((prev) => setItemActive(prev, item));
        navigate('/loggedInPage');
    }
    return (
        <div className="navbar__updated">
            <React.Fragment>
                {isNavVisible && (
                    <Layer>
                        <div
                            className={css({
                                boxSizing: 'border-box',
                                width: '100vw',
                                position: 'fixed',
                                top: '0',
                                left: '0',
                            })}
                        >
                            <AppNavBar
                                title="Hoop Stats"
                                mainItems={mainItems}
                                userItems={userItems}
                                onMainItemSelect={handleMainItemSelect}
                                onUserItemSelect={(item) => handleUserItemSelect(item)}
                                username={currentUser ? currentUser.displayName : "User"}
                                usernameSubtitle="Pursuit Fellow"
                                userImgUrl={currentUser ? photoURL : ""}
                            />
                        </div>
                    </Layer>
                )}
            </React.Fragment>
        </div>
    );
};
