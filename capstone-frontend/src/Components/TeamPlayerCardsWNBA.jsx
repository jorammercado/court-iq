import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PlayerCardWNBA from './PlayerCardWNBA';
import "./TeamPlayerCardsWNBA.scss"
import Spin from './SpinLoad';
import { Block } from 'baseui/block';


const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;
const VITE_X_RAPIDAPI_URL2 = import.meta.env.VITE_X_RAPIDAPI_URL2;

const TeamPlayerCardsWNBA = ({ team,
    primaryColor,
    secondaryColor,
    teamName,
    players
}) => {
    const navigate = useNavigate();
    const [playerStats, setPlayerStats] = useState([]);

    const handleCardClick = (playerId, playerData) => {
        // playerData = { ...playerData, games5, games10, games20, games50, gamesAll }
        // navigate(`/player/${playerId}`, { state: { ...playerData } });
    };

    return (
        <Block maxWidth="1200px" marginLeft="60px" marginRight="60px" >
            <Block className="playerCardsContainer">
                {players && players.map((player, index) => {
                    return (
                        <Block
                            className="playerCardWrapper"
                            key={index}
                            onClick={() => handleCardClick()}
                            style={{ cursor: 'pointer' }}>
                            <PlayerCardWNBA
                                player={player}
                                primaryColor={primaryColor}
                                secondaryColor={secondaryColor}
                                team={teamName}
                            />
                        </Block>
                    )
                })}
            </Block>
        </Block>
    );
};

export default TeamPlayerCardsWNBA;