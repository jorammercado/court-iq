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
import "./TeamStandings.scss"

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
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.request(options);
                setData(response.data.response[0])
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
                <div className="titlev2">
                </div>

                <div>
                    <section >
                        <table className="table table-topV2 cation-top">
                            <caption><img
                                src={logo}
                                alt={`NBA Logo`}
                                style={{ height: "30px", backgroundColor: "#faf7f2" }}
                            /> &nbsp; {stage} {season.replace("\n", "")} </caption>

                        </table>
                    </section>
                    <div className="max__width">
                        <Table
                            columns={["Position", "\u2605", "Logo", "Team", "Games Loss", "Games Loss %",
                                "Games Won", "Games Won %", "Group", "Points Aganist", "Points For"]}
                            data={[
                                [], [], [], [], [], [], [], [], [], []
                            ]}
                        />
                    </div>
                </div>
            </div>
        );

    // let PageSize = 10
    // const [currentPageV2, setCurrentPageV2] = useState(1)
    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPageV2 - 1) * PageSize
    //     const lastPageIndex = firstPageIndex + PageSize
    //     return teams.slice(firstPageIndex, lastPageIndex)
    // }, [currentPageV2, teams])
    
    const teams = []
    for (let i = 0; i < data.length; i++) {
        const temp = []
        temp.push(data[i].position)
        temp.push("")
        temp.push(data[i].team.logo)
        temp.push(data[i].team.name)
        temp.push(data[i].games.lose.total)
        temp.push(data[i].games.lose.percentage)
        temp.push(data[i].games.win.total)
        temp.push(data[i].games.win.percentage)
        temp.push(data[i].group.name)
        temp.push(data[i].points.against)
        temp.push(data[i].points.for)
        teams.push(temp)
    }

    const ROW = {
        foo: 10,
        bar: 'banana',
        url: 'https://example.com/b',
        largeNumber: 8,
        avatarSrc:
            'https://media.api-sports.io/basketball/teams/149.png',
        name: 'User Name',
        title: 'Job Title',
        list: ['One', 'Two', 'Three'],
    };



    // const DATA = Array.from(new Array(20)).fill(ROW);
    const DATA = []
    for (let i = 0; i < teams.length; i++) {
        DATA.push({
            foo: 10,
            bar: 'bananasss',
            url: 'https://www.cnn.com',
            largeNumber: teams[i][0],
            avatarSrc: teams[i][2],
            name: teams[i][3],
            title: teams[i][8],
            list: ['One', 'Two', 'Three', "H"],
        })
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

    function NumberCell({
        value,
        delta,
    }) {
        const [css, theme] = useStyletron();
        const positive = delta >= 0;
        return (
            <div className={css({ display: 'flex', alignItems: 'center' })}>
                <span
                    className={css({ ...theme.typography.MonoParagraphSmall })}
                >
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(value)}
                </span>
                <div
                    className={css({
                        alignItems: 'center',
                        display: 'flex',
                        paddingLeft: theme.sizing.scale300,
                        color: positive
                            ? theme.colors.contentPositive
                            : theme.colors.contentNegative,
                    })}
                >
                    {positive ? <ArrowUp /> : <ArrowDown />}
                    <span
                        className={css({
                            ...theme.typography.MonoLabelSmall,
                            paddingLeft: '2px',
                        })}
                    >
                        {delta}%
                    </span>
                </div>
            </div>
        );
    }

    function TagsCell({ tags }) {
        const [css] = useStyletron();
        return (
            <div className={css({ display: 'flex', alignItems: 'center' })}>
                {tags.map((tag) => {
                    return (
                        <Tag key={tag} closeable={false}>
                            {tag}
                        </Tag>
                    );
                })}
            </div>
        );
    }

    function ButtonsCell({ labels }) {
        const [css, theme] = useStyletron();
        return (
            <div className={css({ display: 'flex', alignItems: 'center' })}>
                {labels.map((label, index) => {
                    return (
                        <Button
                            kind={KIND.secondary}
                            size={SIZE.compact}
                            overrides={{
                                BaseButton: {
                                    style: {
                                        marginLeft: index > 0 ? theme.sizing.scale300 : 0,
                                    },
                                },
                            }}
                            key={label}
                        >
                            {label}
                        </Button>
                    );
                })}
            </div>
        );
    }


    return (
        <div>
            <section >
                <table className="table table-topV2 cation-top">
                    <caption><img
                        src={logo}
                        alt={`NBA Logo`}
                        style={{ height: "30px", backgroundColor: "#faf7f2" }}
                    /> &nbsp; {stage} {season.replace("\n", "")} </caption>

                </table>
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
                        <NumberCell value={row.largeNumber} delta={0.51} />
                    )}
                </TableBuilderColumn>

                <TableBuilderColumn header="Games Lost">
                    {(row) => (
                        <NumberCell value={row.largeNumber} delta={-0.51} />
                    )}
                </TableBuilderColumn>

                <TableBuilderColumn header="Games Lost %">
                    {(row) => <TagsCell tags={row.list} />}
                </TableBuilderColumn>

                <TableBuilderColumn header="Games Won">
                    {(row) => <ButtonsCell labels={row.list} />}
                </TableBuilderColumn>
            </TableBuilder>
        </div>
    );


    // return (
    //     <div className="v2__standings">
    //         <div className="titlev2">
    //         </div>

    //         <div>
    //             <section >
    //                 <table className="table table-topV2 cation-top">
    //                     <caption><img
    //                         src={logo}
    //                         alt={`NBA Logo`}
    //                         style={{ height: "30px", backgroundColor: "#faf7f2" }}
    //                     /> &nbsp; {stage} {season.replace("\n", "")} </caption>

    //                 </table>
    //             </section>
    //             <div className="max__width">
    //                 <Table
    //                     columns={["Position", "\u2605", "Logo", "Team", "Games Loss", "Games Loss %",
    //                         "Games Won", "Games Won %", "Group", "Points Aganist", "Points For"]}

    //                     data={teams}
    //                 />
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default TeamStandingsV2;



{/* 
{currentTableData.map((team, i) => {
    return (
        <TeamStandingCompV2
            key={i}
            team={team}
        />
    )
})}
</tbody> */}