import { React as React2, useEffect, useState, useMemo } from 'react';
import TeamStandingCompV2 from '../Components/TeamStandingCompV2';
import Pagination from '../utils/Pagination';
import axios from 'axios';
import { Table } from 'baseui/table-semantic';
import * as React from "react";
import {
    TableBuilder,
    TableBuilderColumn,
} from 'baseui/table-semantic';
import { StyledLink as Link } from 'baseui/link';
import { Avatar } from 'baseui/avatar';
import { Button, KIND, SIZE } from 'baseui/button';
import { Tag } from 'baseui/tag';
import { useStyletron } from 'baseui';
import { ArrowUp, ArrowDown } from 'baseui/icon';
import Spin from '../Components/SpinLoad';
import "./TeamStandingsV2.scss"

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST;
const VITE_X_RAPIDAPI_URL = import.meta.env.VITE_X_RAPIDAPI_URL;


const options = {
    method: 'GET',
    url: VITE_X_RAPIDAPI_URL,
    params: {
        league: '12',
        season: '2023-2024'
    },
    headers: {
        'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST
    }
};


const TeamStandingsV2 = () => {
    const [data, setData] = useState([])
    const [season, setSeason] = useState("")
    const [stage, setStage] = useState("")
    const [logo, setLogo] = useState("")
    const [westernConference, setWesternConference] = useState([])
    const [easternConference, setEasternConference] = useState([])
    //console.log(data)
    console.log(westernConference)
    console.log(easternConference)
    console.log(season)
    console.log(stage)
    console.log(logo)
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.request(options);
                setData(response.data.response[0])
                setEasternConference(response.data.response[0].filter(e => e.group.name === "Eastern Conference"))
                setWesternConference(response.data.response[0].filter(e => e.group.name === "Western Conference"))
                setSeason(response.data.response[0][0].league.season)
                setStage(response.data.response[0][0].stage)
                setLogo(response.data.response[0][0].league.logo)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])

    if (data == null || data === undefined || data.length === 0 || !data)
        return (
            <div className="v2__standings">
                <div>
                    <section >
                        <table className="logo__caption">
                            <caption>
                                <Link href="https://www.nba.com/" target="_blank" rel="noopener noreferrer">{/* Made NBA logo a link */}
                                    <img
                                        src={logo}
                                        alt={`NBA Logo`}
                                        style={{ height: "30px", backgroundColor: "#faf7f2", cursor: "pointer" }} // Added cursor pointer
                                    />
                                </Link>
                                &nbsp; {stage} {season.replace("\n", "")}
                            </caption>
                        </table>
                    </section>
                    <div className="max__width">
                        <Spin></Spin>
                    </div>
                </div>
            </div>
        );

    const teamsWestern = westernConference.map(team => {
        return {
            position: team.position,
            avatarSrc: team.team.logo,
            name: team.team.name,
            title: team.group.name,
            gamesLost: team.games.lose.total,
            gamesLostPercentage: team.games.lose.percentage,
            gamesWon: team.games.win.total,
            gamesWonPercentage: team.games.win.percentage,
            pointsAgainst: team.points.against,
            pointsFor: team.points.for,
        };
    });

    const DATA = teamsWestern.map((team, index) => {
        return {
            id: index,
            position: team.position,
            avatarSrc: team.avatarSrc,
            name: team.name,
            title: team.title,
            gamesLost: team.gamesLost,
            gamesLostPercentage: team.gamesLostPercentage,
            gamesWon: team.gamesWon,
            gamesWonPercentage: team.gamesWonPercentage,
            pointsAgainst: team.pointsAgainst,
            pointsFor: team.pointsFor,
        };
    });

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

    function NumberCell({
        value,
        delta,
        isPercentage = false,
    }) {
        const [css, theme] = useStyletron();
        let arrowIcon = null;
        let textColor = 'inherit';

        if (isPercentage) {
            const positive = delta > 0;
            const arrowColor = positive ? 'green' : 'red';
            textColor = delta === 0 ? 'inherit' : arrowColor;
            arrowIcon = delta === 0.5 ? null : positive ? <ArrowUp /> : <ArrowDown />;
        }

        return (
            <div className={css({ display: 'flex', alignItems: 'center' })}>
                <span
                    className={css({
                        ...theme.typography.MonoParagraphSmall,
                        color: textColor,
                    })}
                >
                    {value}
                </span>
                {arrowIcon && (
                    <div
                        className={css({
                            alignItems: 'center',
                            display: 'flex',
                            paddingLeft: theme.sizing.scale300,
                            color: textColor,
                        })}
                    >
                        {arrowIcon}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="table__contain">
            <section >
                <table className="table__header">
                    <caption><Link href="https://www.nba.com/" target="_blank" rel="noopener noreferrer">{/* Made NBA logo a link */}
                        <img
                            src={logo}
                            alt={`NBA Logo`}
                            style={{ height: "30px", backgroundColor: "#faf7f2", cursor: "pointer" }} // Added cursor pointer
                        />
                    </Link>
                        &nbsp; {stage} {season.replace("\n", "")} </caption>
                        

                </table>
                <div className="team__title">WEST</div>
            </section>
            <TableBuilder
                overrides={{ Root: { style: { maxHeight: '300px' } } }}
                data={DATA}
            >
                <TableBuilderColumn header="Team">
                    {(row) => (
                        <AvatarCell
                            src={row.avatarSrc}
                            title={row.name}
                            subtitle={row.title}
                        />
                    )}
                </TableBuilderColumn>

                <TableBuilderColumn header="Position">
                    {(row) => (
                        <NumberCell value={row.position} delta={0.51} />
                    )}
                </TableBuilderColumn>

                <TableBuilderColumn header="Games Lost">
                    {(row) => (
                        <NumberCell value={row.gamesLost} delta={-0.51} />
                    )}
                </TableBuilderColumn>

                <TableBuilderColumn header="Games Lost %">
                    {(row) => (
                        <NumberCell value={row.gamesLostPercentage} delta={row.gamesLostPercentage - 0.5} isPercentage />
                    )}
                </TableBuilderColumn>

                <TableBuilderColumn header="Games Won">
                    {(row) => (
                        <NumberCell value={row.gamesWon} delta={0.51} />
                    )}
                </TableBuilderColumn>

                <TableBuilderColumn header="Games Won %">
                    {(row) => (
                        <NumberCell value={row.gamesWonPercentage} delta={row.gamesWonPercentage - 0.5} isPercentage />
                    )}
                </TableBuilderColumn>

                <TableBuilderColumn header="Points Against">
                    {(row) => (
                        <NumberCell value={row.pointsAgainst} delta={0.51} />
                    )}
                </TableBuilderColumn>

                <TableBuilderColumn header="Points For">
                    {(row) => (
                        <NumberCell value={row.pointsFor} delta={0.51} />
                    )}
                </TableBuilderColumn>
            </TableBuilder>
        </div>
    );
}

export default TeamStandingsV2;
