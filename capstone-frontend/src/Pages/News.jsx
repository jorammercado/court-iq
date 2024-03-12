import React, { useState, useEffect } from "react";
import axios from "axios";
import "animate.css";
import "./News.scss";
function News() {
  const [gameData, setGameData] = useState([]);
  console.log(gameData, "---<DATA");
  const VITE_NEWS_API = import.meta.env.VITE_NEWS_API;
  const VITE_NEWS_HOST = import.meta.env.VITE_NEWS_HOST;
  const VITE_NEWS_URL = import.meta.env.VITE_NEWS_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: VITE_NEWS_URL,
          params: {
            gameDate: "20240108",
            topPerformers: "true",
            lineups: "true",
          },
          headers: {
            "X-RapidAPI-Key": VITE_NEWS_API,
            "X-RapidAPI-Host": VITE_NEWS_HOST,
          },
        };
        const response = await axios(options);
        if (response.data.body) {
          const games = Object.values(response.data.body);
          setGameData(games);
        } else {
          console.error("Game data not found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [VITE_NEWS_API, VITE_NEWS_HOST, VITE_NEWS_URL]);

  return (
    <div className="news-container">
      <h1 className="animate__animated animate__zoomIn">Latest Game News</h1>

      <div className="games-list">
        {gameData.map((game) => (
          <div className="game-item" key={game.gameID}>
            <div>Date: {game.gameID.split("_")[0]}</div>
            <div>Away Team: {game.away}</div>
            <div>Away Points: {game.awayPts}</div>
            <div>Home Team: {game.home}</div>
            <div>Home Points: {game.homePts}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
