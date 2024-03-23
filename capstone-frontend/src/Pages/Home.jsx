import "./Home.scss"
import { Button, KIND } from "baseui/button";
import { useNavigate, useParams } from "react-router-dom"
import {
    signInAnon,
} from "../Services/FireBase";
import ChatApp from "../Components/ChatApp";
import "animate.css";

import { Block } from "baseui/block";

import Intro from "../Components/Intro";
import SectionOne from "../Components/SectionOne";
import SectionTwo from "../Components/SectionTwo";
import MyWork from "../Components/MyWork";

import Header from "../Components/Header";
import "./css/main.css"
import "./css/noscript.css"


function Home() {
    const navigate = useNavigate();

    return (
        <Block className="home">
            <Block className="header-container">
                <Block>
                    <Header></Header>
                    <Intro></Intro>
                    <SectionOne></SectionOne>
                    <SectionTwo></SectionTwo>
                    <MyWork></MyWork>
                </Block>
            </Block>
        </Block>
    )
}

export default Home;
