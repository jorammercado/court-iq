import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Assuming environment variables are correctly set up in your .env file
const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL = import.meta.env.VITE_X_RAPIDAPI_URL4;

const TeamStatsComponent = ({teamId,season}) => {
    const [teamStats, setTeamStats] = useState(null);

    useEffect(() => {
        const fetchPlayerStats = async () => {
          const options = {
            method: 'GET',
            url: VITE_X_RAPIDAPI_URL,
            params: { id: teamId, season }, // Make sure the API expects 'id' not 'team'
            headers: {
              'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY,
              'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST,
            },
          };
    
          try {
            const response = await axios.request(options);
            setTeamStats(response.data.response[0]);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPlayerStats();
      }, [teamId, season]);


    return (
        <div>
            <h2>TEAM STATISTICS</h2>
            {teamStats ? (
                <table>
                    <thead>
                        <tr>
                            <th>Statistic</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example statistics displayed, add more as needed */}
                        <tr>
                            <td>Games Played</td>
                            <td>{teamStats.games}</td>
                        </tr>
                        <tr>
                            <td>Points</td>
                            <td>{teamStats.points}</td>
                        </tr>
                    <tr>
                        <td>Field Goals Made</td>
                        <td>{teamStats.fgm}</td>
                    </tr>
                    <tr>
                        <td>Field Goals Attempted</td>
                        <td>{teamStats.fga}</td>
                    </tr>
                    <tr>
                        <td>Field Goal Percentage</td>
                        <td>{teamStats.fgp}%</td>
                    </tr>
                    <tr>
                        <td>Three Point Made</td>
                        <td>{teamStats.tpm}</td>
                    </tr>
                    <tr>
                        <td>Three Point Attempted</td>
                        <td>{teamStats.tpa}</td>
                    </tr>
                    <tr>
                        <td>Three Point Percentage</td>
                        <td>{teamStats.tpp}%</td>
                    </tr>
                    <tr>
                        <td>Rebounds</td>
                        <td>{teamStats.totReb}</td>
                    </tr>
                    <tr>
                        <td>Assists</td>
                        <td>{teamStats.assists}</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
            ) : (
                <p>Loading team statistics...</p>
            )}
        </div>
    );
};

export default TeamStatsComponent;
