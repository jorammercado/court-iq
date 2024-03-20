import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Block } from "baseui/block";
import {
    LabelMedium,
    LabelXSmall,
    LabelLarge,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall
} from "baseui/typography";
import { Heading, HeadingLevel } from 'baseui/heading';
import "./TeamScheduleComponent.scss"
import { useStyletron } from 'baseui';
import { Avatar } from 'baseui/avatar';

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
                console.log("GAMESSSSSSSSSSS= ", response.data)
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

    function AvatarCell({
        src,
        title,
        subtitle,
    }) {
        const [css, theme] = useStyletron();
        return (
            <div className={css({ display: 'flex', alignItems: 'center' })}>
                <Avatar name={title} size="48px" src={src} />
                <div
                    className={css({
                        paddingLeft: theme.sizing.scale550,
                        whiteSpace: 'nowrap',
                    })}
                >
                    <p
                        className={css({
                            ...theme.typography.LabelSmall,
                            margin: 0,
                        })}
                    >
                        {title}
                    </p>
                    <p
                        className={css({
                            ...theme.typography.ParagraphSmall,
                            marginBottom: 0,
                            marginTop: '4px',
                        })}
                    >
                        {subtitle}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Block className="TeamGamesTable">
            <HeadingLevel >
                <Heading styleLevel={4} color="black">
                    Next 5 Games
                </Heading>
            </HeadingLevel>
            <TableBuilder data={games}>
                <TableBuilderColumn header="Date">
                    {row => <div>{row && row.date && row.date.start ? row.date.start.split("T")[0] : ""}</div>}
                </TableBuilderColumn>
                <TableBuilderColumn header="Time">
                    {row => <div>{row && row.date && row.date.start ? row.date.start.split("T")[1].split(".000")[0] : ""} Zulu</div>}
                </TableBuilderColumn>
                <TableBuilderColumn header="Opponent">
                    {row => {
                        const opponent = row.teams.visitors.id.toString() === teamId ? row.teams.home : row.teams.visitors;
                        return <AvatarCell
                        src={opponent.logo}
                        title={opponent.name}
                        subtitle={opponent.code}
                      />;
                    }}
                </TableBuilderColumn>
                <TableBuilderColumn header="Location">
                    {row => <div>{`${row.arena.name}, ${row.arena.city} ${row.arena.state}`}</div>}
                </TableBuilderColumn>
                {/* Add more columns as necessary */}
            </TableBuilder>
        </Block>
    );
};

export default TeamScheduleComponent;
