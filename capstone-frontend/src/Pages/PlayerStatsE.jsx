import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL2 = import.meta.env.VITE_X_RAPIDAPI_URL2;

const PlayerStatsComponent = () => {
    const [playerStats, setPlayerStats] = useState(null);
    const [teamId, setTeamId] = useState('1'); // Default team ID
    const [season, setSeason] = useState('2023'); // Default season

    useEffect(() => {
        const fetchPlayerStats = async () => {
            try {
                const response = await axios.request({
                    method: 'GET',
                    url: `${VITE_X_RAPIDAPI_URL2}`,
                    params: {
                        team: teamId,
                        season: season
                    },
                    headers: {
                        'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY2,
                        'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST2
                    }
                });
                setPlayerStats(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayerStats();
    }, [teamId, season]);

    const handleTeamChange = (e) => {
        setTeamId(e.target.value);
    };

    const handleSeasonChange = (e) => {
        setSeason(e.target.value);
    };

    return (
        <div>
            <h2>Players</h2>
            <div>
                <label htmlFor="teamSelect">Select Team:</label>
                <select id="teamSelect" value={teamId} onChange={handleTeamChange}>
                    <option value="1">Atlanta Hawks</option>
                    <option value="2">Boston Celtics</option>
                    <option value="4">Brooklyn Nets</option>
                    <option value="5">Charlotte Hornets</option>
                    <option value="6">Chicago Bulls</option>
                    <option value="7">Cleveland Cavaliers</option>
                    <option value="8">Dallas Mavericks</option>
                    <option value="9">Denver Nuggets</option>
                    <option value="10">Detroit Pistons</option>
                    <option value="11">Golden State Warriors</option>
                    <option value="14">Houston Rockets</option>
                    <option value="15">Indiana Pacers</option>
                    <option value="16">LA Clippers</option>
                    <option value="17">Los Angeles Lakers</option>
                    <option value="19">Memphis Grizzlies</option>
                    <option value="20">Miami Heat</option>
                    <option value="21">Milwaukee Bucks</option>
                    <option value="22">Minnesota Timberwolves</option>
                    <option value="23">New Orleans Pelicans</option>
                    <option value="24">New York Knicks</option>
                    <option value="25">Oklahoma City Thunder</option>
                    <option value="26">Orlando Magic</option>
                    <option value="27">Philadelphia 76ers</option>
                    <option value="28">Phoenix Suns</option>
                    <option value="29">Portland Trail Blazers</option>
                    <option value="30">Sacramento Kings</option>
                    <option value="31">San Antonio Spurs</option>
                    <option value="38">Toronto Raptors</option>
                    <option value="40">Utah Jazz</option>
                    <option value="41">Washington Wizards</option>
                </select>
            </div>
            <div>
                <label htmlFor="seasonSelect">Select Season:</label>
                <select id="seasonSelect" value={season} onChange={handleSeasonChange}>
                    <option value="2020">2021</option> 
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                   
                </select>
            </div>
            {playerStats ? (
                <div>
                    <h3>Team Roster</h3>
                    <ul>
                        {playerStats.response.map((player, index) => (
                            <li key={index}>
                                <Link to={`/player/${player.id}`}>{player.firstname} {player.lastname}</Link>
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
