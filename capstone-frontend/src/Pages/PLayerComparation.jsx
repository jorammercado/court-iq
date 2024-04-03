import React, { useState } from "react";
import axios from "axios";
import "./PLayerComparation.scss";
import images from "../constants/images";
import 'animate.css'
function PlayerComparison() {
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
      <div className="comparison-heading-container">
       <img  src={images.vsBall} className="court-img animate__animated animate__bounceInDown" alt="" />
      </div>
      <div className="comparison-instruction-container">
        <div className="instruction-card">
          <p className="comparison-instruction">
            Welcome to our NBA player comparison tool! Enter the names of two
            NBA players below and click "Compare Players" to see their detailed
            statistics side by side.
          </p>
        </div>
      </div>

      <div className="player-inputs-container">
        <input
          className="player-input"
          type="text"
          placeholder="🏀 First Player"
          onChange={(e) => setPlayer1(e.target.value)}
        />
       
        <input
          className="player-input"
          type="text"
          placeholder="🏀 Second Player"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
      </div>

      <div className="player-cards-container">
        <div className="player-card">
          {player1Data && (
            <div className="player-info animate__animated animate__backInLeft">
              <img
                className="player-img"
                src={player1Data.espnHeadshot}
                alt=""
              />
              <div className="info-card ">
                <h3 className="player-name">{player1Data.nbaComName}</h3>
                <p className="player-stat">College : {player1Data.college}</p>
                <p className="player-stat">DOB : {player1Data.bDay}</p>
                <p className="player-stat">Weight : {player1Data.weight}</p>
                <p className="player-stat">Height : {player1Data.height}</p>
                <p className="player-stat">Team : {player1Data.team}</p>
                <p className="player-stat">
                  Games PLayed : {player1Data.stats.gamesPlayed}
                </p>
                <p className="player-stat">
                  Rebounds : {player1Data.stats.reb}
                </p>
                <p className="player-stat">Assist : {player1Data.stats.ast}</p>
                <p className="player-stat">
                  Effective Shooting Percentage :{" "}
                  {player1Data.stats.effectiveShootingPercentage}
                </p>
                <p className="player-stat">
                  Shooting Percentage :{" "}
                  {player1Data.stats.trueShootingPercentage}
                </p>
                <p className="player-stat">Points : {player1Data.stats.pts}</p>
                <p className="player-stat">Blocks : {player1Data.stats.blk}</p>
              </div>
            </div>
          )}
        </div>

        <div className="player-card">
          {player2Data && (
            <div className="player-info animate__animated animate__backInRight">
              <img
                className="player-img"
                src={player2Data.espnHeadshot}
                alt=""
              />
              <div className="info-card">
                <h3 className="player-name">{player2Data.nbaComName}</h3>
                <p className="player-stat">College : {player2Data.college}</p>
                <p className="player-stat">DOB : {player2Data.bDay}</p>
                <p className="player-stat">Weight : {player2Data.weight}</p>
                <p className="player-stat">Height : {player2Data.height}</p>
                <p className="player-stat">Team : {player2Data.team}</p>
                <p className="player-stat">
                  Games PLayed : {player2Data.stats.gamesPlayed}
                </p>
                <p className="player-stat">
                  Rebounds : {player2Data.stats.reb}
                </p>
                <p className="player-stat">Assist : {player2Data.stats.ast}</p>
                <p className="player-stat">
                  Effective Shooting Percentage :{" "}
                  {player2Data.stats.effectiveShootingPercentage}
                </p>
                <p className="player-stat">
                  Shooting Percentage :{" "}
                  {player2Data.stats.trueShootingPercentage}
                </p>
                <p className="player-stat">Points : {player2Data.stats.pts}</p>
                <p className="player-stat">Blocks : {player2Data.stats.blk}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="compare-button-container">
        <button className="compare-button" onClick={handleSearch}>
          Compare Players
        </button>
      </div>
      <div className="img-body">
        <img className="court-img" src={images.nbaImgCourt} alt="" />
        <img className="court-img" src={images.playerVs} alt="" />
        <img className="court-img" src={images.ball} alt="" />
        <img className="court-img" src={images.ring} alt="" />
      </div>
    </div>
  );
}

export default PlayerComparison;
