import React from 'react';

const galleryItems = [
    { src: "./images/thumbs/01.jpg", fullSrc: "./images/fulls/01.jpg", title: "The Anonymous Red" },
    { src: "./images/thumbs/02.jpg", fullSrc: "./images/fulls/02.jpg", title: "Airchitecture II" },
    { src: "./images/thumbs/03.jpg", fullSrc: "./images/fulls/03.jpg", title: "Air Lounge" },
    { src: "./images/thumbs/04.jpg", fullSrc: "./images/fulls/04.jpg", title: "Carry on" },
    { src: "./images/thumbs/05.jpg", fullSrc: "./images/fulls/05.jpg", title: "The sparkling shell" },
    { src: "./images/thumbs/06.jpg", fullSrc: "./images/fulls/06.jpg", title: "Bent IX" },
];

const MyWork = () => (
    <section id="work" className="main style3 primary">
        <div className="content">
        <header>
                <h2>In Depth Prop Research</h2>
            </header>
            <p className="deep-dive-message">
                By exploring the depth of props, we enable users to make more informed assumptions
            </p>
        </div>
    </section>
);

export default MyWork;
