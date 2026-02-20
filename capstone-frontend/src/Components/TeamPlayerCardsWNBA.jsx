import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import PlayerCardWNBA from './PlayerCardWNBA'
import './TeamPlayerCardsWNBA.scss'
import Spin from './SpinLoad'
import { Block } from 'baseui/block'

const TeamPlayerCardsWNBA = ({ team, primaryColor, secondaryColor, teamName, players }) => {
  const navigate = useNavigate()
  // console.log(players)
  const handleCardClick = (playerId, playerData) => {
    playerData = { ...playerData, team: { ...team } }
    navigate(`/playerWNBA/${playerId}`, { state: { ...playerData } })
  }

  return (
    <Block maxWidth="1200px" marginLeft="60px" marginRight="60px">
      <Block className="playerCardsContainerWNBA">
        {players ? (
          players &&
          players.map((player, index) => {
            return (
              <Block
                className="playerCardWrapper"
                key={index}
                onClick={() => handleCardClick(player.id, player)}
                style={{ cursor: 'pointer' }}
              >
                <PlayerCardWNBA
                  player={player}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  team={teamName}
                />
              </Block>
            )
          })
        ) : (
          <Spin></Spin>
        )}
      </Block>
    </Block>
  )
}

export default TeamPlayerCardsWNBA
