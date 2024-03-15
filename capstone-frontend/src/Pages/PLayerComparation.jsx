import React, { useState } from "react";
import axios from "axios";
import "./PLayerComparation.scss";

function PLayerComparation() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Data, setPlayer1Data] = useState(null);
  const [player2Data, setPlayer2Data] = useState(null);

  const PLAYER_URL = import.meta.env.VITE_PLAYER_URL;
  const PLAYER_HOST = import.meta.env.VITE_PLAYER_HOST;
  const PLAYER_API_KEY = import.meta.env.VITE_PLAYER_API_KEY;

  const handleSearch = async () => {
    try {
      const options1 = {
        method: "GET",
        url: PLAYER_URL,
        params: {
          playerName: player1,
          statsToGet: "averages",
        },
        headers: {
          "X-RapidAPI-Key": PLAYER_API_KEY,
          "X-RapidAPI-Host": PLAYER_HOST,
        },
      };

      const options2 = {
        method: "GET",
        url: PLAYER_URL,
        params: {
          playerName: player2,
          statsToGet: "averages",
        },
        headers: {
          "X-RapidAPI-Key": PLAYER_API_KEY,
          "X-RapidAPI-Host": PLAYER_HOST,
        },
      };

      const [response1, response2] = await Promise.all([
        axios.request(options1),
        axios.request(options2),
      ]);

      setPlayer1Data(response1.data.body[0]);
      setPlayer2Data(response2.data.body[0]);
    } catch (error) {
      console.error("Error searching for players:", error);
    }
  };
  return (
    <div className="player-comparison-container">
      <div className="player-card">
        <input
          className="player-input input1"
          type="text"
          placeholder="Enter Player 1 Name"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
        {player1Data && (
          <div className="player-stats">
            <h3 className="player-name">{player1Data.nbaComName}</h3>
            <div className="info-card">
              <p className="player-stat"> Weight :{player1Data.weight}</p>
              <p className="player-stat">Height : {player1Data.height}</p>
              <p className="player-stat">Team : {player1Data.team}</p>
            </div>
            <img className="player-img" src={player1Data.espnHeadshot} alt="" />
            <div className="info-card">
              <p className="player-stat">Rebounds: {player1Data.stats.reb}</p>
              <p className="player-stat">Points: {player1Data.stats.pts}</p>
              <p className="player-stat">Blocks: {player1Data.stats.blk}</p>
            </div>
          </div>
        )}
      </div>
      <div className="player-card">
        <input
          className="player-input input2"
          type="text"
          placeholder="Enter Player 2 Name"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
        {player2Data && (
          <div className="player-stats">
            <h3 className="player-name">{player2Data.nbaComName}</h3>
            <div className="info-card">
              <p className="player-stat">Weight:{player2Data.weight}</p>
              <p className="player-stat">Height: {player2Data.height}</p>
              <p className="player-stat">Team : {player2Data.team}</p>
            </div>
            <img className="player-img" src={player2Data.espnHeadshot} alt="" />
            <div className="info-card">
              <p className="player-stat">Rebounds: {player2Data.stats.reb}</p>
              <p className="player-stat">Points: {player2Data.stats.pts}</p>
              <p className="player-stat">Blocks: {player2Data.stats.blk}</p>
            </div>
          </div>
        )}
      </div>
      <div className="compare-button-container">
        <button className="compare-button" onClick={handleSearch}>
          Compare Players
        </button>
      </div>
    </div>
  );
}

export default PLayerComparation;
