import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// Assuming these environment variables are correctly defined in your .env file
const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;

const PlayerStatsComponent = ( {team, season} ) => {
    const [playerStats, setPlayerStats] = useState(null);
    

    useEffect(() => {
        console.log("Making request with team:",team, "and season:",season);
        const fetchPlayerStats = async () => {
            
            const options = {
                method: 'GET',
                url: VITE_X_RAPIDAPI_URL3, // Make sure this URL points to the correct API endpoint
                params: 
                    { team: team, season: season } // Assuming 'season' is a valid prop being passed
                ,
                headers: {
                    'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY2,
                    'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST2
                }
            };
            try {
                const response = await axios.request(options);
                setPlayerStats(response.data.response); // Adjust according to the actual data structure
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayerStats();
    }, [team, season]);

  

    return (
        <div>
            <h2>TEAMS PAGE</h2>
            {playerStats ? (
                <div>
                    <h3>Team Roster</h3>
                    <ul>
                        {playerStats.slice(0, 18).map((player, index) => (
                            <p key={index}>
                                <Link to={`/player/${player.player.id}`} state={player.player} >{player.player.firstname} {player.player.lastname}</Link>

                                 </p>
                            
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
