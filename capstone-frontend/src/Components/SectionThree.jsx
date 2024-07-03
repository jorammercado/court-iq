import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import "./SectionThree.scss"

const SectionThree = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const ref = useRef(null);
  const [divWidth, setDivWidth] = useState(0);
  // console.log(screenWidth)
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
      x: -15,
    },
    offscreen: {
      x: screenWidth > 629 ? 0 - 600 : -screenWidth + 20,
    },
  };

  function MoveInWhenVisible({ children }) {
    return (
      <motion.div

        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false }}
        transition={{ duration: 1.25 }}
        variants={variants}
        style={{ marginRight: 0, padding: 0, width: "100%" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <section id="three" className="main style2 left dark fullscreen">

      <MoveInWhenVisible>
        <div className="content box style2" style={{ backgroundColor: "#faf7f2", borderTopRightRadius: "8px", borderBottomRightRadius: "8px" }}>
          <header>
            <h2>What We Do</h2>
          </header>
          <h5>
            Discover much more than what your average sports statistics site offers. <br></br><br></br>
            <span style={{ color: "#EA6607" }}>Select</span> the stats you want to see or compare, and
            <span style={{ color: "#EA6607" }}> &nbsp; Zoom In/Out</span> to focus on your specific range of interest (double click to zoom back out).
          </h5>


        </div>
      </MoveInWhenVisible>
      <a href="#two" className="button style2 down anchored">Next</a>
    </section>
  );
};

export default SectionThree;