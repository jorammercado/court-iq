import "./Home.scss"
import React from 'react';
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
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';


function Home() {
    React.useEffect(() => {
        Events.scrollEvent.register('begin', function() {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function() {
            console.log("end", arguments);
        });

        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        };
    }, []);

    return (
        <div className="home">
            <Header></Header>
            <Link activeClass="active" to="intro" spy={true} smooth={true} duration={500}>
        
            </Link>
            <Link activeClass="active" to="sectionOne" spy={true} smooth={true} duration={500}>
                
            </Link>
            <Link activeClass="active" to="sectionTwo" spy={true} smooth={true} duration={500}>
                
            </Link>
            <Link activeClass="active" to="myWork" spy={true} smooth={true} duration={500}>
               
            </Link>
            <Element name="intro" className="element" style={{ height: "100vh" }}>
                <Intro />
            </Element>
            <Element name="sectionOne" className="element" style={{ height: "100vh" }}>
                <SectionOne />
            </Element>
            <Element name="sectionTwo" className="element" style={{ height: "100vh" }}>
                <SectionTwo />
            </Element>
            <Element name="myWork" className="element" style={{ height: "100vh" }}>
                <MyWork />
            </Element>
        </div>
    );
}

export default Home;


