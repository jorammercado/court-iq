import "./Home.scss"
import { Button, KIND } from "baseui/button";
import { useNavigate, useParams } from "react-router-dom"
import {
    signInAnon,
} from "../Services/FireBase";
import ChatApp from "../Components/ChatApp";
import "animate.css";
import logoInColor from '../assets/LOGO_IN_COLOR.svg';
import { Block } from "baseui/block";

function Home() {
    const navigate = useNavigate();

    return (
        <Block className="home">
            <Block className="header-container">
                <Block className="sub-title">
                    Elevate Your Game with CoutIQ: Where Analytics Meet Action
                </Block>
                <Block className="logo animate__animated animate__bounceInLeft">
                    <img src={logoInColor} alt="Logo" />
                </Block>
            </Block>
            <ChatApp />
        </Block>
    )
}

export default Home;