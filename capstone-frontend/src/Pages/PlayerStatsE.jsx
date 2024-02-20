import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL2 = import.meta.env.VITE_X_RAPIDAPI_URL2;

const options = {
    method: 'GET',
    url: VITE_X_RAPIDAPI_URL2,
    params: {
        team: '1',
        season: '2021'
      },
    headers: {
        'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY2,
        'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST2
    }
};

const PlayerStatsComponent = () => {
    const [playerStats, setPlayerStats] = useState(null);

    useEffect(() => {
        const fetchPlayerStats = async () => {
            try {
                const response = await axios.request(options);
                setPlayerStats(response.data);
                console.log(response.data)
            } 
            catch (error) {
                console.error(error);
            }
            };

        fetchPlayerStats();
    }, []);

    return (
        <div>
            <h2>Players</h2>
            {playerStats ? (
                <div>
                    <h3>Team Roster</h3>
                    <ul>
                        {playerStats.response.map((player, index) => (
                            <li key={index}>
                                {player.firstname} {player.lastname} - {player.position}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading player stats...</p>
            )}
        </div>
    );
};

export default PlayerStatsComponent;
