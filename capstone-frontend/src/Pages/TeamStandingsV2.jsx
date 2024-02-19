import { useEffect, useState, useMemo } from 'react';
import TeamStandingCompV2 from '../Components/TeamStandingComp';
import Pagination from '../utils/Pagination';
import axios from 'axios';
import "./TeamStandings.scss"
import * as React from "react";
import { Table } from "baseui/table-semantic";

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
    const [teams, setTeams] = useState([])
    const [season, setSeason] = useState("")
    const [stage, setStage] = useState("")
    const [logo, setLogo] = useState("")
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.request(options);
                setTeams(response.data.response[0])
                setSeason(response.data.response[0][0].league.season)
                setStage(response.data.response[0][0].stage)
                setLogo(response.data.response[0][0].league.logo)
                //console.log(response.data.response[0])
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])

    let PageSize = 10
    const [currentPageV2, setCurrentPageV2] = useState(1)
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPageV2 - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        return teams.slice(firstPageIndex, lastPageIndex)
    }, [currentPageV2, teams])

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
                        data={[...currentTableData ]}
                    />
                </div>


                {/* <Table
                    columns={["Position", "\u2605", "Logo", "Team", "Games Loss","Games Loss %", 
                    "Games Won", "Games Won %", "Group", "Points Aganist", "Points For"  ]}
                    data={[
                        teams.map(team => team.position),
                        [],
                        teams.map(team => team.position),
                    ]}
                /> */}
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPageV2}
                    totalCount={teams.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPageV2(page)}
                />


            </div>
        </div>
    );
}

export default TeamStandingsV2;


{/* <thead>
<tr className="position">
    <th>
        Position
    </th>
    <th className="is_favorite">
        {`\u2605`}
    </th>
    <th className="logo">
        Logo
    </th>
    <th className="name">
        Team
    </th>
    <th className="games__loss">
        Games Loss
    </th>
    <th className="games__loss%">
        Games Loss %
    </th>
    <th className="games__won">
        Games Won
    </th>
    <th className="games__won%">
        Games Won %
    </th>
    <th className="group">
        Group
    </th>
    <th className="points__against">
        Points Aganist
    </th>
    <th className="points__for">
        Points For
    </th>
</tr>
</thead>
<tbody>
{currentTableData.map((team, i) => {
    return (
        <TeamStandingCompV2
            key={i}
            team={team}
        />
    )
})}
</tbody> */}