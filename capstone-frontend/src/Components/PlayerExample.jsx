import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';
const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;

function PlayerExample({ legend, options, playerid }) {
    const [playerStats, setPlayerStats] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState('2023'); // Initial season

    useEffect(() => {
        const fetchPlayerStats = async () => {
            const requestOptions = {
                method: 'GET',
                url: VITE_X_RAPIDAPI_URL3,
                params: {
                    id: playerid,
                    season: selectedSeason 
                },
                headers: {
                    'X-RapidAPI-Key': `${VITE_X_RAPIDAPI_KEY2}`,
                    'X-RapidAPI-Host': `${VITE_X_RAPIDAPI_HOST2}`
                }
            };

            try {
                const response = await axios(requestOptions);
                setPlayerStats(response.data.response);
                console.log(response.data.response)
            } catch (error) {
                console.error('Error fetching player statistics:', error);
            }
        };

        fetchPlayerStats();
    }, [playerid, selectedSeason]); // Update fetch when playerid or selectedSeason changes

    const calculateAveragePointsPerGame = () => {
        if (!playerStats) return null;
    
        let totalPoints = 0;
        let totalGames = 0;
        playerStats.forEach(stat => {
            // If points is null or undefined, treat it as 0
            const points = stat.points || 0;
            totalPoints += parseInt(points);
            totalGames++;
        });
    
        // Avoid division by zero
        if (totalGames === 0) return 0;
    
        const averagePointsPerGame = totalPoints / totalGames;
        return averagePointsPerGame.toFixed(2);
    };

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    };

    return (
        <div>
            <div className="chart-container" style={{ minWidth: "700px" }}>
                <div style={{ textAlign: "center", marginBottom: '10px' }}>
                    
                    <label htmlFor="season">Select Season:</label>
                    <select id="season" value={selectedSeason} onChange={handleSeasonChange}>
                        <option value="2022">2020</option>
                        <option value="2022">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        
                    </select>
                </div>
                {playerStats && (
                    <>
                        {/* <Line data={playerStats.data} legend={legend} options={options} /> */}
                        <p>Average Points Per Game: {calculateAveragePointsPerGame()}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default PlayerExample;
