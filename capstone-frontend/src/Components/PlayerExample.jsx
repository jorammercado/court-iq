import React, { useEffect, useState } from "react";
import { Table } from "baseui/table-semantic";
import { Line } from "react-chartjs-2";
import axios from "axios";
import MyGraph from "./MyChart";

const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;

function PlayerExample({ legend, options, playerid }) {
    const [playerStats, setPlayerStats] = useState([]);
    const [points, setPoints] = useState([]);
    const [assist, setAssist] = useState([]);
    const [rebounds, setRebounds] = useState([]);
    const [threePoints, setThreePoints] = useState([]);
    const [plusMinus, setPlusMinus] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState("2023"); // Initial season

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
                setPoints(response.data.response.map((e) => e.points));
                setAssist(response.data.response.map((e) => e.assists));
                setRebounds(response.data.response.map((e) => e.defReb + e.offReb));
                setThreePoints(response.data.response.map((e) => e.tpm));
                setPlusMinus(response.data.response.map((e) => e.plusMinus));
                setMinutes(response.data.response.map((e) => e.min));
            } catch (error) {
                console.error("Error fetching player statistics:", error);
            }
        };

        fetchPlayerStats();
    }, [playerid, selectedSeason]); // Update fetch when playerid or selectedSeason changes

    const calculateAveragePointsPerGame = () => {
        if (!playerStats) return null;

        let totalPoints = 0;
        let totalGames = 0;
        playerStats.forEach((stat) => {
            const points = stat.points || 0;
            totalPoints += parseInt(points);
            totalGames++;
        });

        if (totalGames === 0) return 0;

        const averagePointsPerGame = totalPoints / totalGames;
        return averagePointsPerGame.toFixed(2);
    };

    const calculateAverageReboundsPerGame = () => {
        if (!playerStats) return null;

        let totalRebounds = 0;
        let totalGames = 0;
        playerStats.forEach((stat) => {
            const rebounds = stat.totReb || 0; // Assuming totReb represents total rebounds
            totalRebounds += parseInt(rebounds);
            totalGames++;
        });

        if (totalGames === 0) return 0;

        const averageReboundsPerGame = totalRebounds / totalGames;
        return averageReboundsPerGame.toFixed(2);
    };

    const calculateAverageAssistsPerGame = () => {
        if (!playerStats) return null;

        let totalAssists = 0;
        let totalGames = 0;
        playerStats.forEach((stat) => {
            const assists = stat.assists || 0;
            totalAssists += parseInt(assists);
            totalGames++;
        });

        if (totalGames === 0) return 0;

        const averageAssistsPerGame = totalAssists / totalGames;
        return averageAssistsPerGame.toFixed(2);
    };

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

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    };

    return (
        <div>
            <div>
                <div className="chart-container" style={{ minWidth: "700px" }}>
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <label htmlFor="season">Select Season:</label>
                        <select
                            id="season"
                            value={selectedSeason}
                            onChange={handleSeasonChange}
                        >
                            <option value="2022">2020</option>
                            <option value="2022">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">Current</option>
                        </select>
                    </div>
                    {playerStats && (
                        <>
                            <p>Average Points Per Game: {calculateAveragePointsPerGame()}</p>
                            <p>
                                Average Rebounds Per Game: {calculateAverageReboundsPerGame()}
                            </p>
                            <p>
                                Average Assists Per Game: {calculateAverageAssistsPerGame()}
                            </p>
                        </>
                    )}
                </div>
                <MyGraph
                // playerStats={playerStats}
                // points={points}
                // assist={assist}
                // rebounds={rebounds}
                // threePoints={threePoints}
                // plusMinus={plusMinus}
                // minutes={minutes}
                />
            </div>
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
                                    //   playerStats[0].team.name,
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
