import React from 'react'
import Player from '../Components/Player'
import { useParams, useLocation } from 'react-router-dom'
import './PlayerPage.scss'

const PlayerExamplePage = () => {
  const { state } = useLocation()
  const { playerid } = useParams()

  return (
    <div className="playerexamplepage">
      <Player playerid={playerid} data={state} />
    </div>
  )
}

export default PlayerExamplePage
