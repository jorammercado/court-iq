import React, { useRef } from "react";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

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
    right: 150,
    bottom: 35,
    zIndex: 0,
    pointerEvents: 'none', 
  };

  const contentOverlayStyle = {
    backgroundColor: "transparent",
    border: "none",
    margin: "0",
    padding: "0",
    position: 'relative',
    zIndex: 1, 
  };

  return (
    <section id="two" className="main style2 left dark fullscreen">

      <MoveInWhenVisible>
        <div className="content box style2" style={{  position: 'relative', backgroundColor:"#faf7f2" }}>
          <div style={giphyContainerStyle}>
            {/* <iframe src={giphyEmbedUrl} style={{ width: 400, height: 390, paddingBottom:"120px", border: 'none' }} allowFullScreen></iframe> */}
            <iframe src="https://giphy.com/embed/nUMdnsYhklgaB2TWkK" style={{ border: 'solid white' }} allowFullScreen></iframe>
          </div>
          <div style={contentOverlayStyle}>
            <header style={{ paddingBottom: "120px", marginTop:"-25px" }}>
              <h3>Ask Anything About Basketball Stats</h3>
              <h5 >Quick answers with our custom search engine</h5>
            </header>
          </div>
        </div>
      </MoveInWhenVisible>
      <a href="#work" className="button style2 down anchored">Next</a>
    </section>
  );
};

export default SectionTwo;