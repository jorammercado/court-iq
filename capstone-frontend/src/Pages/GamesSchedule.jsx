import { React, useEffect, useState, useMemo } from "react";
import Pagination from "../utils/Pagination";
import axios from "axios";
import { Table } from "baseui/table-semantic";
const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST;
const VITE_X_RAPIDAPI_URL_GAMES = import.meta.env.VITE_X_RAPIDAPI_URL_GAMES;

const options = {
  method: "GET",
  url: VITE_X_RAPIDAPI_URL_GAMES,
  params: {
    league: "12",
    season: "2023-2024",
  },
  headers: {
    "X-RapidAPI-Key": VITE_X_RAPIDAPI_KEY,
    "X-RapidAPI-Host": VITE_X_RAPIDAPI_HOST,
  },
};
const GamesSchedule = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.request(options);
        setGames(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);



  const COLUMNS = ["Date", "Time",  'League',"Season", "Scores" , "Country",];
  const overrides = {};


  
  return (
    <div>
      <h1>Game Schedules</h1>
      <div style={{ height: "400px", overflow: "auto" }}>
        <Table
          overrides={overrides}
          columns={COLUMNS}
          data={games.map((game) => [
            game.date,
            game.time,
            game.league.name,
            game.league.season,
            game.scores.home.quarter_1,
            game.country.name,

          ])}
        />
      </div>
    </div>
  );
};

export default GamesSchedule;
