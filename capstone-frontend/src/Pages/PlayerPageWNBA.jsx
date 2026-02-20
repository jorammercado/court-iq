import React from 'react'
import PlayerWNBA from '../Components/PlayerWNBA'
import { useParams, useLocation } from 'react-router-dom'
import './PlayerPageWNBA.scss'

const PlayerPageWNBA = () => {
  const { state } = useLocation()
  const { playerid } = useParams()

  return (
    <div className="playerpage">
      <PlayerWNBA playerid={playerid} data={state} />
    </div>
  )
}

export default PlayerPageWNBA
