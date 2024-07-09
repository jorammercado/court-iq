import React, { useEffect, useState } from 'react';
import "./Intro.scss"
import "../Pages/css/main.css"

const Intro = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // console.log(screenWidth)

    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    // console.log("is mobile = ", isMobile)

    const backgroundImageStyle = {
        backgroundSize: !isMobile && screenWidth > 830 ? 'cover' : 'cover',
        backgroundRepeat: !isMobile && screenWidth > 830 ? 'no-repeat' : 'no-repeat',
        backgroundAttachment: !isMobile ? 'fixed' : 'scroll',
    };

    return (
        <section id="intro" className="main style1 dark fullscreen" style={backgroundImageStyle} >
            <div className="content" style={{ backgroundColor: "#faf7f2", borderRadius: "8px", zIndex: 0 }}>
                <header>
                    <h2>Beyond the Arc Analytics Unleashed</h2>
                </header>
                <h4>Elevate your <span style={{ color: "#EA6607" }}>Betting</span> game, <br />
                    where Analytics Meet Action</h4>
                <footer>
                    <a href="#one" className="button style2 down">More</a>
                </footer>
            </div>
        </section>
    )
};

export default Intro;
