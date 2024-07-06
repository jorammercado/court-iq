import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Block } from "baseui/block";
import { Heading, HeadingLevel } from 'baseui/heading';
import "./TeamStats.scss"
import Spin from './SpinLoad';

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL = import.meta.env.VITE_X_RAPIDAPI_URL4;

const TeamStatsComponent = ({ teamId, season, isHighlightedSeason }) => {
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
                if (response.data.response && response.data.response.length > 0) {
                    // Initialize a structure for totals with games played count
                    let totals = { games: response.data.response.length };

                    // Define stats to exclude from the averaging
                    const excludeStats = ['fastBreakPoints', 'pointsInPaint', 'biggestLead', 'secondChancePoints', 'pointsOffTurnovers', 'longestRun', 'plusMinus'];

                    // Aggregate stats for averages
                    response.data.response.forEach(game => {
                        Object.keys(game).forEach(stat => {
                            if (!excludeStats.includes(stat) && typeof game[stat] === 'number') {
                                totals[stat] = (totals[stat] || 0) + game[stat];
                            }
                        });
                    });

                    // Calculate averages, excluding games from division
                    let averages = Object.keys(totals).reduce((acc, stat) => {
                        acc[stat] = stat === 'games' ? totals[stat] : parseFloat((totals[stat] / totals.games).toFixed(2));
                        return acc;
                    }, {});

                    setTeamStats([averages]);
                } else {
                    setTeamStats(null); // Use null to indicate no data or invalid structure
                }
            } catch (error) {
                console.error('Failed to fetch team stats:', error);
                setTeamStats(null);
            }
        };

        fetchTeamStats();
    }, [teamId, season]);

    if (!teamStats) {
        return <Spin></Spin>;
    }

    // Dynamically generate columns for the stats, excluding the 'games' column from averaging
    const statColumns = Object.keys(teamStats[0])
        .filter(stat => !['games'].includes(stat)) // Optionally exclude 'games' from the columns if it's not needed
        .map(key => ({
            header: key.charAt(0).toUpperCase() + key.slice(1).replace(/[A-Z]/g, letter => ` ${letter}`), // Improve readability of acronyms
            id: key,
        }));

    return (
        <Block className="TeamStatsTable1" style={{
            justifyContent: "left", alignItems: "flex-left", display: "flex", width: "91%",
            marginBottom: "-19px", marginTop: "0px"
        }}>
            <Block className="heading" width="100%"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 0) 100%),
                    url(https://theforeword.org/wp-content/uploads/2023/10/offseasonpower_getty_ringer.0.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right',
                    backgroundRepeat: 'no-repeat',
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px"
                }}>
                <Block className="heading" backgroundColor={isHighlightedSeason ? "#EA6607" : "transparent"} width="100%">
                    <HeadingLevel >
                        <Heading className="titleHighlight" styleLevel={4}
                            color="white"
                            backgroundColor={isHighlightedSeason ? "#EA6607" : "none"}
                            marginBottom="0px"
                            marginLeft="5px">
                            Season Stats
                        </Heading>
                    </HeadingLevel>
                </Block>
            </Block>
            <Block className="tableContainer1" style={{ justifyContent: "left" }}>
                <TableBuilder data={teamStats} >
                    {statColumns.map(column => (
                        <TableBuilderColumn key={column.id} header={column.header}>
                            {row => <div>{row[column.id]}</div>}
                        </TableBuilderColumn>
                    ))}
                </TableBuilder>
            </Block>
        </Block>
    );
};

export default TeamStatsComponent;
