import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HeadLine.scss";
import { Link } from "react-router-dom";
import images from "../constants/images";

function Headlines() {
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  const URL = import.meta.env.VITE_HEADLINE_URL;
  const KEY = import.meta.env.VITE_HEADLINE_KEY;
  const HOST = import.meta.env.VITE_HEADLINE_HOST;

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const options = {
          method: "GET",
          url: URL,
          params: {
            recentNews: "true",
            maxItems: "10",
          },
          headers: {
            "X-RapidAPI-Key": KEY,
            "X-RapidAPI-Host": HOST,
          },
        };
        const response = await axios.request(options);
        if (Array.isArray(response.data)) {
          setHeadlines(response.data);
        } else if (response.data.body && Array.isArray(response.data.body)) {
          setHeadlines(response.data.body);
        } else {
          console.error("Invalid data format received from API");
          setError("Invalid data format received from API");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error searching for headlines:", error);
      }
    };

    fetchHeadlines();
  }, []);

  return (
    <div className="headlines-container">
      <h1 className="headlines-title">Top Headlines News</h1>
      <h4 className="headlines-description">
        Welcome to our NBA news section, where you can find the latest and top
        headlines from the world of NBA. Stay updated with the most recent
        happenings in the basketball world.
      </h4>
      {error && <p className="error-message">Error: {error}</p>}
      <div className="headline-list">
        {headlines.map((headline, index) => (
          <div className="headline" key={index}>
            <p className="headline-title">{headline.title}</p>
            <img
              className="headline-image"
              src={headline.image}
              alt={headline.title}
            />
            <p
              className="headline-link"
              onClick={() => window.open(headline.link, "_blank")}
            >
              Read more
            </p>
          </div>
        ))}
      </div>
      <div className="compare-card">
        <h1 className="compare-title">Curious about player comparisons?</h1>
        <div className="img-headlines">
          <img className="court-im1" src={images.playerVs2} alt="" />
          <img className="court-im1" src={images.vs} alt="" />
          <img className="court-im1" src={images.playerVs} alt="" />
        </div>
        <h4 className="compare-description">
          <strong>
            {" "}
            Are you eager to see how your favorite NBA players stack up against
            each other?{" "}
          </strong>{" "}
          <br /> Our player comparison tool allows you to explore detailed
          statistics and make informed comparisons. <br />
          <strong>Click below to begin your exploration.</strong>
        </h4>
        <Link className="compare-link" to="/PlayerComparison">
          <p>
            {" "}
            <strong>Explore player comparisons</strong>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Headlines;
