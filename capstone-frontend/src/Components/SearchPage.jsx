import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        const fetchTeamLeaders = async () => {
            const teams = []; // Array of team IDs or details
            const season = '2023';
            let allLeaders = [];

            for (const team of teams) {
                const response = await axios.get('https://api-nba-v1.p.rapidapi.com/players/statistics', {
                    params: { team: team.id, season },
                    headers: {
                        'X-RapidAPI-Key': import.meta.env.VITE_X_RAPIDAPI_KEY2,
                        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
                    }
                });

                const teamLeaders = processTeamData(response.data.response);
                allLeaders.push({ team: team.name, leaders: teamLeaders });
            }

            setLeaders(allLeaders);
        };

        fetchTeamLeaders();
    }, []);

    // Process and find leaders for a team
    const processTeamData = (playersStats) => {
        // Logic to process data and find leaders
        // This involves sorting and filtering the `playersStats` array
        return {
            pointsLeader: {}, // Object with player details and points
            assistsLeader: {},
            reboundsLeader: {},
            // Add other categories
        };
    };

    return (
        <div>
            <h1>League Leaders for 2023 Season</h1>
            {leaders.map(team => (
                <div key={team.team}>
                    <h2>{team.team}</h2>
                    {/* Render team leaders here */}
                </div>
            ))}
        </div>
    );
};

export default SearchPage;
