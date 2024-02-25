import { React, useEffect, useState, useMemo } from 'react';
import TeamStandingComp from '../Components/TeamStandingComp';
import Pagination from '../utils/Pagination';
import axios from 'axios';
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


const TeamStandings = () => {
    const [teams, setTeams] = useState([])
    const [season, setSeason] = useState("")
    const [stage, setStage] = useState("")
    const [logo, setLogo] = useState("")
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.request(options);
                console.log(response.data.response)
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
        <div>
            <div className="title">
                 {""}
            </div>
            <section className="table table-responsive table-top">
                <table className="table table-hover table-responsive  table-dark caption-top " >
                    <caption><img
                        src={logo}
                        alt={`NBA Logo`}
                        style={{ height: "40px", backgroundColor: "#faf7f2" }}
                    />{stage} {season.replace("\n", "")} </caption>
                    <thead>
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
                                <TeamStandingComp
                                    key={i}
                                    team={team}
                                />
                            )
                        })}
                    </tbody>
                </table>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPageV2}
                    totalCount={teams.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPageV2(page)}
                />
            </section>


        </div>
    );
}

export default TeamStandings;
