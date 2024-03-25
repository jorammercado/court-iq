import React from 'react';
import image01 from "../Pages/images/thumbs/01.jpg"
import image02 from "../Pages/images/thumbs/02.jpg"
import image03 from "../Pages/images/thumbs/03.jpg"
import image04 from "../Pages/images/thumbs/04.jpg"
import image05 from "../Pages/images/thumbs/05.jpg"
import image06 from "../Pages/images/thumbs/06.jpg"


const MyWork = () => (
    <section id="work" className="main style3 primary">
        <div className="content">
            <header>
                <h2>In Depth Prop Research</h2>
                <p className="deep-dive-message">
                    By exploring the depth of props, we enable users to make more informed assumptions
                </p>
            </header>
            <div className="gallery">
                <article className="from-left">
                    <img src={image01} title="The Anonymous Red" alt="" />
                </article>
                <article className="from-right">
                    <img src={image02} title="Airchitecture II" alt="" />
                </article>
                <article className="from-left">
                    <img src={image03} title="Air Lounge" alt="" />
                </article>
                <article className="from-right">
                    <img src={image04} title="Carry on" alt="" />
                </article>
                <article className="from-left">
                    <img src={image05} title="The sparkling shell" alt="" />
                </article>
                <article className="from-right">
                    <img src={image06} title="Bent IX" alt="" />
                </article>
                </div>
        </div>
    </section>
);

export default MyWork;