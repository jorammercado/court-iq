import React from 'react';
import "./Intro.scss"

const Intro = () => (
    <section id="intro" className="main style1 dark fullscreen" >
        <div className="content" style={{backgroundColor:"#faf7f2", borderRadius:"8px"}}>
            <header>
                <h2>Beyond the Arc Analytics Unleashed</h2>
            </header>
            <h4>Elevate your <span style={{color:"#EA6607"}}>Betting</span> game, <br /> 
                where Analytics Meet Action</h4>
            <footer>
                <a href="#one" className="button style2 down">More</a>
            </footer>
        </div>
    </section>
);

export default Intro;
