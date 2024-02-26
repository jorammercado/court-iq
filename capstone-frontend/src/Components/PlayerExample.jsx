import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "baseui/table-semantic";

const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;

function PlayerExample({ playerid }) {
  const [playerStats, setPlayerStats] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("2023");

  useEffect(() => {
    const fetchPlayerStats = async () => {
      const requestOptions = {
        method: "GET",
        url: VITE_X_RAPIDAPI_URL3,
        params: {
          id: playerid,
          season: selectedSeason,
        },
        headers: {
          "X-RapidAPI-Key": `${VITE_X_RAPIDAPI_KEY2}`,
          "X-RapidAPI-Host": `${VITE_X_RAPIDAPI_HOST2}`,
        },
      };

      try {
        const response = await axios(requestOptions);
        setPlayerStats(response.data.response);
        console.log(response.data.response);
      } catch (error) {
        console.error("Error fetching player statistics:", error);
      }
    };

    fetchPlayerStats();
  }, [playerid, selectedSeason]);

  const calculateTotalBlocksForSeason = (playerStats) => {
    if (!playerStats) return 0;

    const totalBlocks = playerStats.reduce(
      (total, stat) => total + parseInt(stat.blocks || 0),
      0
    );

    return totalBlocks;
  };

  const calculateTotalAssistsForSeason = (playerStats) => {
    if (!playerStats) return 0;

    const totalAssists = playerStats.reduce(
      (total, stat) => total + parseInt(stat.assists || 0),
      0
    );

    return totalAssists;
  };

  const calculateTotalPointsForSeason = (playerStats) => {
    if (!playerStats) return 0;

    const totalPoints = playerStats.reduce(
      (total, stat) => total + parseInt(stat.points || 0),
      0
    );

    return totalPoints;
  };

  const getLastFiveGames = () => {
    if (!playerStats) return [];

    const sortedStats = playerStats.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return sortedStats.slice(0, 5);
  };

  const overrides = {};

  //   const handleSeasonChange = (event) => {
  //     setSelectedSeason(event.target.value);
  //   };

  return (
    <div>
      <div className="chart-container" style={{ minWidth: "700px" }}>
        {playerStats && playerStats.length > 0 && (
          <div>
            <h1>
              {playerStats[0].player.firstname} {playerStats[0].player.lastname}
            </h1>
          </div>
        )}
        <div style={{ height: "400px", overflow: "auto", width: "60rem" }}>
          <h2>Current Season Stats</h2>
          {playerStats ? (
            <Table
              overrides={overrides}
              columns={[
                "Total Assists",
                "Total Blocks",
                "Total Points",
                "Team",
              ]}
              data={[
                [
                  calculateTotalAssistsForSeason(playerStats),
                  calculateTotalBlocksForSeason(playerStats),
                  calculateTotalPointsForSeason(playerStats),
                  playerStats[0].team.name,
                ],
              ]}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div style={{ height: "400px", overflow: "auto", width: "60rem" }}>
          <h2>Last 5 Games Stats</h2>
          {playerStats ? (
            <Table
              overrides={overrides}
              columns={["Assists", "Blocks", "Points", "Team"]}
              data={getLastFiveGames().map((stat) => [
                stat.assists,
                stat.blocks,
                stat.points,
                stat.team.name,
              ])}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerExample;
