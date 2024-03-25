import React from 'react';
import searchImage from "../Pages/css/images/search.png"

const SectionTwo = () => (
  <section id="two" className="main style2 left dark fullscreen">
    <div className="content box style2">
      <header>
        <h2>Ask Anything About Basketball Stats</h2>
      </header>
      <p>Our AI Delivers Instant Insights</p>
      <div className="image-content-box">
        <img src={searchImage} alt="Descriptive Alt Text" />
      </div>
    </div>
    <a href="#work" className="button style2 down anchored">Next</a>
  </section>
);

export default SectionTwo;
