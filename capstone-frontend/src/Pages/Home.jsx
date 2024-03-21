import "./Home.scss"
import { Button, KIND } from "baseui/button";
import { useNavigate, useParams } from "react-router-dom"
import {
    signInAnon,
} from "../Services/FireBase";
import ChatApp from "../Components/ChatApp";
import "animate.css";

import { Block } from "baseui/block";

function Home() {
    const navigate = useNavigate();
    
    return (
        <Block className="home">
            <Block className="header-container">
                <Block className="sub-title">
                    Elevate Your Game with CoutIQ: Where Analytics Meet Action
                </Block>
            </Block>
        </Block>
    )
}

export default Home;
