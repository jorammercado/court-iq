import { React, useEffect, useState, useMemo } from "react";
import Pagination from "../utils/Pagination";
import axios from "axios";

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

  return (
    <div>
      <div className="title">{""}</div>
      <section className="table table-responsive table-top">
        <table className="table table-hover table-responsive  table-dark caption-top ">
          <thead>
            <tr className="position">
              <th>Date</th>
              <th>Time</th>
              <th>Status Short</th>
              <th>Status Long</th>
              <th>scores</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={index}>
                <td>{game.date}</td>
                <td>{game.time}</td>
                <td>{game.status.short}</td>
                <td>{game.status.long}</td>
                <td>{game.scores.home.quarter_1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default GamesSchedule;
