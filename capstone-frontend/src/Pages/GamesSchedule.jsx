


import { React, useEffect, useState, useMemo } from 'react';
import Pagination from '../utils/Pagination';
import axios from 'axios';


const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST;
const VITE_X_RAPIDAPI_URL_GAMES = import.meta.env.VITE_X_RAPIDAPI_URL_GAMES;


const options = {
    method: 'GET',
    url: VITE_X_RAPIDAPI_URL_GAMES,
    params: {
        league: '12',
        season: '2023-2024',
        date: '2024-02-19'
    },
    headers: {
        'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST
    }
};


const GamesSchedule = () => {
    const [games, setgames] = useState([])
    const [season, setSeason] = useState("")
    const [stage, setStage] = useState("")
    const [logo, setLogo] = useState("")
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.request(options);
                setgames(response.data.response[0])
               
                console.log(response.data.response[0])
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [])

    // let PageSize = 10
    // const [currentPageV2, setCurrentPageV2] = useState(1)
    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPageV2 - 1) * PageSize
    //     const lastPageIndex = firstPageIndex + PageSize
    //     return games.slice(firstPageIndex, lastPageIndex)
    // }, [currentPageV2, games])

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
                                date: {games.date}
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
                  
                </table>
                {/* <Pagination
                    className="pagination-bar"
                    currentPage={currentPageV2}
                    totalCount={games.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPageV2(page)}
                /> */}
            </section>


        </div>
    );
}

export default GamesSchedule;

