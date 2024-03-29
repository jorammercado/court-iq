import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PlayerCard from './PlayerCard';
import "./PlayerStatsE.scss"
import Spin from './SpinLoad';
import { Block } from 'baseui/block';


const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;
const VITE_X_RAPIDAPI_URL2 = import.meta.env.VITE_X_RAPIDAPI_URL2;

const PlayerStatsComponent = ({ team, season, isSearchVisible, setIsSearchVisible, primaryColor, secondaryColor, teamName }) => {
    const navigate = useNavigate();
    const [playerStats, setPlayerStats] = useState([]);
    const [personalData, setPersonalData] = useState({});

    useEffect(() => {
        const fetchPlayerStats = async () => {
            try {
                const response = await axios.request({
                    method: 'GET',
                    url: VITE_X_RAPIDAPI_URL2,
                    params: {
                        team: team,
                        season: season
                    },
                    headers: {
                        'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY2,
                        'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST2
                    }
                });
                setPersonalData(response.data.response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPlayerStats();
    }, [team, season]);


    useEffect(() => {
        console.log("Making request with team:", team, "and season:", season);
        const fetchPlayerStats = async () => {

            const options = {
                method: 'GET',
                url: VITE_X_RAPIDAPI_URL3,
                params:
                    { team: team, season: season }
                ,
                headers: {
                    'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY2,
                    'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST2
                }
            };
            try {
                const response = await axios.request(options);
                setPlayerStats(response.data.response);
                console.log(response.data.response)
            } catch (error) {
                console.error(error);
            }
        };

        fetchPlayerStats();
    }, [team, season]);

    if (!playerStats) {
        return <Spin></Spin>;
    }

    const handleCardClick = (playerId, playerData) => {
        setIsSearchVisible(false);
        navigate(`/player/${playerId}`, { state: { ...playerData } });
    };

    return (
        <Block maxWidth="1450px" marginLeft="60px" marginRight="60px" >
            <Block className="playerCardsContainer">
                {playerStats && playerStats.slice(0, 15).map((player, index) => {
                    let personalDataPassed = null
                    if (personalData && personalData.length > 0)
                        personalDataPassed = personalData.filter((elem, index) => elem.id === player.player.id)[0]
                    else
                        personalDataPassed = []
                    return (
                        <Block
                            className="playerCardWrapper"
                            key={index}
                            onClick={() => handleCardClick(player.player.id, player.player)}
                            style={{ cursor: 'pointer' }}>
                            <PlayerCard player={player} personalData={personalDataPassed}
                                primaryColor={primaryColor}
                                secondaryColor={secondaryColor}
                                team={teamName}
                                 />
                        </Block>
                    )
                }, personalData)}
            </Block>
        </Block>
    );
};

export default PlayerStatsComponent;