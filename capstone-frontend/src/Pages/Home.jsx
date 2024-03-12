import "./Home.scss"
import { Button, KIND } from "baseui/button";
import { useNavigate, useParams } from "react-router-dom"
import {
    signInAnon,
} from "../Services/FireBase";
import ChatApp from "../Components/ChatApp";
import "animate.css";
import logoInColor from '../assets/LOGO_IN_COLOR.svg';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="header-container">
                <div className="sub-title">
                    Elevate Your Game with CoutIQ: Where Analytics Meet Action
                </div>
                <div className="logo animate__animated animate__bounceInLeft">
                    <img src={logoInColor} alt="Logo" />
                </div>
            </div>
            <ChatApp />
        </div>
    )
}

export default Home;