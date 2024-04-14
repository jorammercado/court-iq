import React, { useRef } from "react";
import image01 from "../Pages/images/thumbs/01.jpg"
import image02 from "../Pages/images/thumbs/02.jpg"
import image03 from "../Pages/images/thumbs/03.jpg"
import image04 from "../Pages/images/thumbs/04.jpg"
import image05 from "../Pages/images/thumbs/05.jpg"
import image06 from "../Pages/images/thumbs/06.jpg"
import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import searchImage from "../Pages/css/images/search.png"

const MyWork = () => {

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

    const variantsRight = {
        onscreen: {
            x: 0,
        },
        offscreen: {
            x: 0 + (.20 * divWidth) + divWidth,
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

    function MoveInWhenVisibleRight({ children }) {
        return (
            <motion.div

                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: false }}
                transition={{ duration: 1 }}
                variants={variantsRight}
                style={{ marginRight: 0, padding: 0, width: "100%" }}
            >
                {children}
            </motion.div>
        );
    }



    return (
        <section id="work" className="main style3 primary" style={{ backgroundColor: "#faf7f2" }}>
            <div className="content" style={{ backgroundColor: "#faf7f2", boxShadow: "none", borderStyle:"none" }}>
                <header>
                    <h2>In Depth Prop Research</h2>
                    <h5 className="deep-dive-message">
                        By exploring the depth of props, we enable users to make more informed assumptions
                    </h5>
                </header>
                <div className="gallery" >
                    <article className="from-left">
                        <MoveInWhenVisible>
                            <div className="image fit">
                                <img src={image01} ref={ref} title="The Anonymous Red" alt="" />
                            </div>
                        </MoveInWhenVisible>
                    </article>
                    <article className="from-right">
                        <MoveInWhenVisibleRight>
                            <div className="image fit">
                                <img src={image02} title="Airchitecture II" alt="" />
                            </div>
                        </MoveInWhenVisibleRight>
                    </article>
                    <article className="from-left">
                        <MoveInWhenVisible>
                            <div className="image fit">
                                <img src={image03} title="Air Lounge" alt="" />
                            </div>
                        </MoveInWhenVisible>
                    </article>
                    <article className="from-right">
                        <MoveInWhenVisibleRight>
                            <div className="image fit">
                                <img src={image04} title="Carry on" alt="" />
                            </div>
                        </MoveInWhenVisibleRight>
                    </article>
                    <article className="from-left">
                        <MoveInWhenVisible>
                            <div className="image fit">
                                <img src={image05} title="The sparkling shell" alt="" />
                            </div>
                        </MoveInWhenVisible>
                    </article>
                    <article className="from-right">
                        <MoveInWhenVisibleRight>
                            <div className="image fit">
                                <img src={image06} title="Bent IX" alt="" />
                            </div>
                        </MoveInWhenVisibleRight>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default MyWork;