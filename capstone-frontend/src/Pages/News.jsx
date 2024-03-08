import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "baseui/table-semantic";

function News() {
  const [gameData, setGameData] = useState([]);

  const VITE_NEWS_API = import.meta.env.VITE_NEWS_API;
  const VITE_NEWS_HOST = import.meta.env.VITE_NEWS_HOST;
  const VITE_NEWS_URL = import.meta.env.VITE_NEWS_URL;

  useEffect(() => {
    const options = {
      method: "GET",
      url: VITE_NEWS_URL,
      params: {
        teamAbv: "DAL",
        season: "2024",
      },
      headers: {
        "X-RapidAPI-Key": VITE_NEWS_API,
        "X-RapidAPI-Host": VITE_NEWS_HOST,
      },
    };
    axios(options)
      .then((response) => {
        setGameData(response.data.body.schedule);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const COLUMNS = [
    "Date",
    "Time",
    
    "Season",
    "Home Quarter 1 Score",
    "Country Name",
  ];

  return (
    <div>
      <h1>Latest Game News</h1>
      <Table
        columns={COLUMNS}
        data={gameData.map((game) => [
          game.gameDate,
          game.gameTime,
         
          game.seasonType,
          game.homePts,
          game.neutralSite ? "Neutral" : game.away,
        ])}
      />
    </div>
  );
}

export default News;
