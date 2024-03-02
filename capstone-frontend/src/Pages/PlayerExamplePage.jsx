import React from 'react';
import PlayerExample from '../Components/PlayerExample';
import { useParams, useLocation } from "react-router-dom"
import "./PlayerExamplePage.scss"

const PlayerExamplePage = () => {
    const { state } = useLocation();
    const { playerid } = useParams()

    return (
        <div className="playerexamplepage">
            <PlayerExample playerid={playerid} data={state} />
        </div>

    );
}

export default PlayerExamplePage;