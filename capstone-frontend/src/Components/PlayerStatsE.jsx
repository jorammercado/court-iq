import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PlayerCard from './PlayerCard';
import "./PlayerStatsE.scss"
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

    if (!playerStats) {
        return <p>Loading player stats...</p>;
    }

    return (
        <div>
        <div className="playerCardsContainer"> {/* Updated class name */}
            {playerStats && playerStats.slice(0, 15).map((player, index) => (
                <PlayerCard key={index} player={player} />
            ))}
        </div>
    </div>
    );
};

export default PlayerStatsComponent;