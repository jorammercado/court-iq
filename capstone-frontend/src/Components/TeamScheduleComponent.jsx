import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL_GAMES = import.meta.env.VITE_X_RAPIDAPI_URL_GAMES;

const TeamScheduleComponent = ({ teamId, season }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const options = {
                method: 'GET',
                url: VITE_X_RAPIDAPI_URL_GAMES,
                params: { team: teamId, season },
                headers: {
                    'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST,
                },
            };
    
            try {
                const response = await axios.request(options);
                const gamesData = response.data.response;
    
                // Filter out games from 2023 and earlier
                const futureGames = gamesData.filter(game => {
                    const gameYear = new Date(game.date.start).getFullYear();
                    return gameYear > 2023; // Change this as needed for different years
                });
    
                // Get the last 5 games from the filtered list
                const lastFiveGames = futureGames.slice(-5);
    
                setGames(lastFiveGames);
            } catch (error) {
                console.error('Failed to fetch games:', error);
            }
        };
    
        fetchGames();
    }, [teamId, season]);
    

    if (games.length === 0) {
        return <p>Loading games...</p>;
    }

    return (
        <div className="TeamGamesTable">
            <h2>Next 5 Games</h2>
            <TableBuilder data={games}>
                <TableBuilderColumn header="Date">
                    {row => <div>{new Date(row.date.start).toLocaleString()}</div>}
                </TableBuilderColumn>
                <TableBuilderColumn header="Opponent">
                    {row => {
                        const opponent = row.teams.visitors.id.toString() === teamId ? row.teams.home : row.teams.visitors;
                        return <div>{opponent.name}</div>;
                    }}
                </TableBuilderColumn>
                <TableBuilderColumn header="Location">
                    {row => <div>{`${row.arena.name}, ${row.arena.city}`}</div>}
                </TableBuilderColumn>
                {/* Add more columns as necessary */}
            </TableBuilder>
        </div>
    );
};

export default TeamScheduleComponent;
