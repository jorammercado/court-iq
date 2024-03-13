import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL = import.meta.env.VITE_X_RAPIDAPI_URL4;

const TeamStatsComponent = ({ teamId, season }) => {
    const [teamStats, setTeamStats] = useState(null);

    useEffect(() => {
        const fetchTeamStats = async () => {
            const options = {
                method: 'GET',
                url: VITE_X_RAPIDAPI_URL,
                params: { id: teamId, season },
                headers: {
                    'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST,
                },
            };

            try {
                const response = await axios.request(options);
                // Filter out unwanted stats here by checking their keys or values
                const filteredData = response.data.response[0];
                const keysToRemove = ['fastBreakPoints', 'pointsInPaint', 'biggestLead', 'secondChancePoints', 'pointsOffTurnovers', 'longestRun'];
                keysToRemove.forEach(key => delete filteredData[key]); // Remove specified keys
                setTeamStats([filteredData]); // Wrap in array for TableBuilder
            } catch (error) {
                console.error(error);
            }
        };

        fetchTeamStats();
    }, [teamId, season]);

    if (!teamStats) {
        return <p>Loading team statistics...</p>;
    }

    // Since all stats are in a single row, we prepare columns dynamically based on keys
    const statColumns = Object.keys(teamStats[0]).map(key => ({
        header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
        id: key,
    }));

    return (
        <div className="TeamStatsTable">
            <h2>Current Season</h2>
            <TableBuilder data={teamStats}>
                {statColumns.map(column => (
                    <TableBuilderColumn key={column.id} header={column.header}>
                        {row => <div>{row[column.id]}</div>}
                    </TableBuilderColumn>
                ))}
            </TableBuilder>
        </div>
    );
};

export default TeamStatsComponent;
