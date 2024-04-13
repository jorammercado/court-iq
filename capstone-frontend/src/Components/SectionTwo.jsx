import React, { useRef } from "react";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import "./SectionTwo.scss"

const SectionTwo = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const ref = useRef(null);
  const [divWidth, setDivWidth] = useState(0);
  useEffect(() => {
    if (ref.current) {
      setDivWidth(ref.current.getBoundingClientRect().width);
    }

    const handleResize = () => {
      if (ref.current) {
        setDivWidth(ref.current.getBoundingClientRect().width);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const variants = {
    onscreen: {
      x: 0,
    },
    offscreen: {
      x: 0 - 600,
    },
  };

  function MoveInWhenVisible({ children }) {
    return (
      <motion.div

        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        variants={variants}
        style={{ marginRight: 0, padding: 0, width: "100%" }}
      >
        {children}
      </motion.div>
    );
  }

  const giphyEmbedUrl = 'https://giphy.com/embed/dZR5yN9m8pTGcZ9qHZ'

  const giphyContainerStyle = {
    position: 'absolute',
    right: 90,
    left: 90,
    bottom: -2,
    zIndex: 2,
    pointerEvents: 'none',
  };

  const contentOverlayStyle = {
    backgroundColor: "transparent",
    border: "none",
    margin: "0",
    padding: "0",
    position: 'relative',
    zIndex: 3,
  };

  return (
    <section id="two" className="main style2 left dark fullscreen" style={{ zIndex: 1 }}>
      {/* <div style={{ zIndex: 1, backgroundColor:"red" }}>test</div> */}
      <MoveInWhenVisible>
        <div className="content box style2" style={{ position: 'relative', backgroundColor: "black", zIndex: 4 }}>
          <h3 style={{
            color: "white",
            backgroundColor: "black",
            zIndex: 5,
            position: "relative",
            marginBottom: "110px",
            marginTop: "-10px"
          }}>Ask Anything About Basketball Stats</h3>
          <div style={giphyContainerStyle}>
            {/* <iframe src={giphyEmbedUrl} style={{ width: 400, height: 390, paddingBottom:"120px", border: 'none' }} allowFullScreen></iframe> */}
            {/* <iframe src="https://giphy.com/embed/g623uVENzJhDI0lx40" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> */}
            {/* <iframe src="https://giphy.com/embed/zYxfiQGXp4vtUKlhEN" width="480" height="160" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> */}
            <iframe src="https://giphy.com/embed/g623uVENzJhDI0lx40" style={{ border: 'none', marginLeft: "-45px", marginBottom: "30px", width: "480px", height: "270px" }} allowFullScreen></iframe>
          </div>
          <div style={contentOverlayStyle}>
            <header style={{ paddingBottom: "120px", marginTop: "-52px" }}>
            </header>
          </div>
          <h5 style={{
            color: "white",
            backgroundColor: "black",
            zIndex: 5,
            position: "relative",
            marginBottom: "-20px",
            marginTop: "-30px",
            textAlign: "left"
          }}>Quick answers with our custom search engine, <br></br>
            avaiable for any team, any player, multiple seasons.
          </h5>
        </div>
      </MoveInWhenVisible>
      <a href="#work" className="button style2 down anchored" style={{ zIndex: 5 }}>Next</a>
    </section>
  );
};

export default SectionTwo;