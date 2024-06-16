import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import { Block } from "baseui/block";
import { Heading, HeadingLevel } from 'baseui/heading';
import "./TeamSchedule.scss"
import { useStyletron } from 'baseui';
import { Avatar } from 'baseui/avatar';
import Spin from './SpinLoad';

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL_GAMES = import.meta.env.VITE_X_RAPIDAPI_URL_GAMES;

const TeamScheduleComponent = ({ teamId, season, gamesInView, isHighlighted,
    onGames5Change,
    onGames10Change,
    onGames20Change,
    onGames50Change,
    onGamesAllChange }) => {
    const [games, setGames] = useState([]);
    const [games10, setGames10] = useState([]);
    const [games20, setGames20] = useState([]);
    const [games50, setGames50] = useState([]);
    const [gamesAll, setGamesAll] = useState([]);

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
                gamesData.sort((a, b) => new Date(a.date.start) - new Date(b.date.start));
                const lastFiveGames = gamesData.slice(-5);
                const last10Games = gamesData.slice(-10);
                const last20Games = gamesData.slice(-20);
                const last50Games = gamesData.slice(-50);
                const lastAllGames = [...gamesData]

                setGames(lastFiveGames);
                setGames10(last10Games);
                setGames20(last20Games);
                setGames50(last50Games);
                setGamesAll(lastAllGames)

                onGames5Change(lastFiveGames);
                onGames10Change(last10Games);
                onGames20Change(last20Games);
                onGames50Change(last50Games);
                onGamesAllChange(lastAllGames);
            } catch (error) {
                console.error('Failed to fetch games:', error);
            }
        };

        fetchGames();
    }, [teamId, season]);


    if (games.length === 0) {
        return <Spin></Spin>;
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
        <Block className="TeamGamesTable" style={{
            justifyContent: "left",
            alignItems: "flex-left",
            display: "flex",
            width: "91%",
            marginBottom: "-23px"
        }}>
            <Block className="head" width="100%"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 0) 100%),
                    url(https://theforeword.org/wp-content/uploads/2023/10/offseasonpower_getty_ringer.0.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center calc(72% + 0px)',
                    backgroundRepeat: 'no-repeat',
                }}>
                <Block className="head" width="100%">
                    <HeadingLevel >
                        <Heading className="headingTransition"
                            styleLevel={4}
                            color="white"
                            marginBottom="0px"
                            marginLeft="5px"
                            backgroundColor={isHighlighted ? "#EA6607" : "none"}>
                            {Number(season >= 2023 && gamesInView === '5') ? `Next 5 Games` :
                                Number(season >= 2023 && gamesInView === '10') ? `Last 10 Games Schedule of Season` :
                                    Number(season >= 2023 && gamesInView === '20') ? `Last 20 Games Schedule of Season` :
                                        Number(season >= 2023 && gamesInView === '50') ? `Last 50 Games Schedule of Season` :
                                            gamesInView === 'season' ? `Entire ${gamesAll.length} Games of Season` :
                                                gamesInView === '10' ? `Last 10 Games of Season` :
                                                    gamesInView === '20' ? `Last 20 Games of Season` :
                                                        gamesInView === '50' ? `Last 50 Games of Season` :
                                                            `Last 5 Games of Season`}
                        </Heading>
                    </HeadingLevel>
                </Block>
            </Block>
            <Block className="scheduleTable">
                <TableBuilder data={gamesInView === '5' ? games : gamesInView === '10' ? games10 : gamesInView === '20' ? games20 : gamesInView === '50' ? games50 : gamesAll}
                    overrides={{ Root: { style: { maxHeight: "500px", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" } } }}>
                    <TableBuilderColumn header="Date">
                        {row => <div>{row && row.date && row.date.start ? new Date(row.date.start).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0] : ""}</div>}
                    </TableBuilderColumn>
                    <TableBuilderColumn header="Time">
                        {row => <div>{row && row.date && row.date.start && row.date.start.split("T")[1] ?
                            new Date(row.date.start).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[1].replace(/:00(?=\s?(AM|PM)$)/, '') + " EST," +
                            new Date(row.date.start).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }).split(",")[1].replace(/:00(?=\s?(AM|PM)$)/, '') + " PST" : ""} </div>}
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
                        {row => <div>{`${row.arena.name ? row.arena.name + "," : "n/a"} ${row.arena.city ? row.arena.city : ""} ${row.arena.state ? row.arena.state : ""}`}</div>}
                    </TableBuilderColumn>
                    <TableBuilderColumn header="Score (h-v)">
                        {row => <div>{`${row && row.scores && row.scores.home && row.scores.home.points ? `${row.scores.home.points} - ${row.scores.visitors.points}` : "n/a"}`}</div>}
                    </TableBuilderColumn>
                </TableBuilder>
            </Block>
        </Block>
    );
};

export default TeamScheduleComponent;
