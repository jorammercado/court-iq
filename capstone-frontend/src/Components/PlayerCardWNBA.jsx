import React, { useEffect, useState } from 'react'
import { Card, StyledBody, StyledThumbnail } from 'baseui/card'
import { useNavigate } from 'react-router-dom'
import { Block } from 'baseui/block'

const PlayerCardWNBA = ({ player, primaryColor, secondaryColor, team }) => {
  const navigate = useNavigate()
  const playerImageBackup = 'https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'
  const [textColor, setTextColor] = useState('white')

  return (
    <Card
      overrides={{
        Root: {
          style: {
            display: 'flex',
            justifyContent: 'center',
            width: '232px',
            height: '179px',
            marginBottom: '5px',
            backgroundColor: primaryColor,
            borderRadius: '8px',
            border: 'none',
            transition: 'box-shadow 0.3s ease-in-out',
            ':hover': {
              boxShadow:
                `rgba(0, 0, 0, 0.5) 0px 80px 80px -20px,` +
                ` rgba(0, 0, 0, 0.3) 0px -20px 50px -10px,` +
                ` rgba(0, 0, 0, 0.4) 0px 10px 20px -5px,` +
                ` rgba(0, 0, 0, 0.35) 0px 30px 35px -5px,` +
                ` rgba(0, 0, 0, 0.45) 0px -10px 25px -5px,` +
                ` rgba(0, 0, 0, 0.5) 0px 100px 100px -30px,` +
                ` rgba(0, 0, 0, 0.6) 0px 120px 120px -40px`,
            },
          },
        },
        Title: {
          style: {
            fontSize: '19px',
            textAlign: 'center',
            marginTop: '-6px',
            marginBottom: '18px',
            lineHeight: '1.1',
            color: textColor,
          },
        },
      }}
      title={`${player.firstName} ${player.lastName}`}
    >
      <Block marginBottom="26px" marginTop="-16px">
        <StyledThumbnail
          src={
            player && player.headshot && player.headshot.href
              ? player.headshot.href
              : playerImageBackup
          }
          style={{ width: '240px', height: '180px', border: 'none', marginTop: '-10px' }}
        />
        <StyledBody
          style={{
            fontSize: '15px',
            fontWeight: '600',
            lineHeight: '1.1',
            marginTop: '23px',
            color: textColor,
          }}
        ></StyledBody>
      </Block>
    </Card>
  )
}

export default PlayerCardWNBA
