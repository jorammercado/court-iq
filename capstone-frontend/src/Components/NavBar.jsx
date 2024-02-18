
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { Layer } from 'baseui/layer';
import { ChevronDown, Delete, Overflow, Upload, Blank } from 'baseui/icon';
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
        { icon: Upload, label: 'Maps' },
        { icon: Upload, label: 'Test' },
        {
            icon: ChevronDown,
            label: 'Charts',
            navExitIcon: Delete,
            children: [
                { icon: Upload, label: 'test pie chart 1' },
                { icon: Upload, label: 'test line chart 2' },
                { icon: Upload, label: 'conley' },
                { icon: Upload, label: 'test chart 4' },
            ],
        },
        {
            icon: ChevronDown,
            label: 'Primary D',
            navExitIcon: Delete,
            children: [
                {
                    icon: ChevronDown,
                    label: 'Secondary E',
                    children: [
                        { icon: Upload, label: 'Tertiary A' },
                        { icon: Upload, label: 'Tertiary B' },
                    ],
                },
                { icon: Upload, label: 'Secondary F' },
            ],
        },
    ]);

    const [userItems, setUserItems] = React.useState([
        { icon: Blank, label: 'User' },
        { icon: Overflow, label: 'Account item2' },
        { icon: Overflow, label: 'Account item3' },
        { icon: Overflow, label: 'Account item4' },
    ]);

    const [isNavVisible, setIsNavVisible] = React.useState(true);

    function handleMainItemSelect(item) {
        setMainItems((prev) => setItemActive(prev, item));
        if (item.label === "Maps")
            navigate('/maps');
        if (item.label === "test pie chart 1")
            navigate('/chart');
        if (item.label === "test line chart 2")
            navigate('/chartLine');
        if (item.label === "conley")
            navigate('/conley_example');
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
                                title="Capstone"
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
