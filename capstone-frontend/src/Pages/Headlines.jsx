import React, { useState, useEffect } from "react";
import axios from "axios";
import './HeadLine.scss'
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
      <h1 className="headlines-title"> Top Headlines News</h1>
      {error && <p className="error-message">Error: {error}</p>}
      <div className="headline-list">
        {headlines.map((headline, index) => (
          <div className="headline" key={index}>
            <p className="headline-title">{headline.title}</p>
            <img className="headline-image" src={headline.image} alt={headline.title} />
            <p className="headline-link" onClick={() => window.open(headline.link, "_blank")}>Read more</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  
}

export default Headlines;
