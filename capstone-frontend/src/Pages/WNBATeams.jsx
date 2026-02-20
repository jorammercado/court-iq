import React, { useEffect, useState } from 'react'
import './WNBATeams.scss'
import axios from 'axios'
import { Block } from 'baseui/block'
import { Heading, HeadingLevel } from 'baseui/heading'
import { Select } from 'baseui/select'
import { Avatar } from 'baseui/avatar'
import '../App.scss'
import primaryColors from '../constants/primaryTeamColorsWNBA'
import secondaryColors from '../constants/secondaryTeamColorsWNBA'
import teamOptions from '../constants/teamOptionsWNBA'
import TeamPlayerCardsWNBA from '../Components/TeamPlayerCardsWNBA'
import TeamRecordWNBA from '../Components/TeamRecordWNBA'
import GameOddsRostersWNBA from '../Components/GameOddsRostersWNBA'

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY
const VITE_X_RAPIDAPI_HOST_WNBA = import.meta.env.VITE_X_RAPIDAPI_HOST_WNBA

const WNBATeams = ({}) => {
  const [primaryColor, setPrimaryColor] = useState('#EA6607')
  const [secondaryColor, setSecondaryColor] = useState('#000000')
  const fontsfamilies = []
  const [team, setTeam] = useState({})
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [teamRecord, setTeamRecord] = useState([])
  const [teamNextEvent, setTeamNextEvent] = useState({})
  const [teamStanding, setTeamStanding] = useState('')
  const init = getRandomTeamId()
  const [teamId, setTeamId] = useState(init[0])
  const [selectedTeamName, setSelectedTeamName] = useState(init[1])
  const [eventIds, setEventIds] = useState([])

  useEffect(() => {
    const fetchEventsForTeam = async () => {
      const apiKey = import.meta.env.VITE_ODDS_API_KEY
      const sport = 'basketball_wnba'
      try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sport}/events`, {
          params: { apiKey, regions: 'us' },
        })
        // console.log(response)
        const events = response.data.filter(
          (event) => event.home_team === selectedTeamName || event.away_team === selectedTeamName
        )
        const eventIds = events.map((event) => event.id)
        setEventIds(eventIds)
      } catch (error) {
        console.error(error)
      }
    }

    if (selectedTeamName) {
      fetchEventsForTeam()
    }
  }, [selectedTeamName])

  useEffect(() => {
    const fetchTeams = async () => {
      const options = {
        method: 'GET',
        url: `https://${VITE_X_RAPIDAPI_HOST_WNBA}/wnbateamlist`,
        headers: {
          'x-rapidapi-key': VITE_X_RAPIDAPI_KEY,
          'x-rapidapi-host': VITE_X_RAPIDAPI_HOST_WNBA,
        },
      }

      try {
        const response = await axios.request(options)
        setTeams(response.data.sports[0].leagues[0])
      } catch (error) {
        console.error(error)
      }
    }
    fetchTeams()
  }, [])

  useEffect(() => {
    const fetchTeamData = async () => {
      const options = {
        method: 'GET',
        url: `https://${VITE_X_RAPIDAPI_HOST_WNBA}/wnbateamplayers`,
        params: { teamid: `${teamId}` },
        headers: {
          'x-rapidapi-key': VITE_X_RAPIDAPI_KEY,
          'x-rapidapi-host': VITE_X_RAPIDAPI_HOST_WNBA,
        },
      }

      try {
        const response = await axios.request(options)
        // console.log(response)
        setPlayers(response.data.team.athletes)
        setTeamRecord(response.data.team.record.items)
        setTeamNextEvent(response.data.team.nextEvent[0])
        setTeamStanding(response.data.team.standingSummary)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTeamData()
  }, [teamId])
  // console.log(teamRecord)

  function getRandomTeamId() {
    const randomArray = new Uint32Array(1)
    window.crypto.getRandomValues(randomArray)
    const randomIndex = randomArray[0] % teamOptions.length
    return [teamOptions[randomIndex].id, teamOptions[randomIndex].label]
  }

  const calculateMarginLeft = () => {
    const screenWidth = window.innerWidth
    return screenWidth > 1425 ? (screenWidth - 1425) / 2 + 65 : 50
  }
  const [marginLeft, setMarginLeft] = useState(calculateMarginLeft())

  useEffect(() => {
    const handleResize = () => {
      setMarginLeft(calculateMarginLeft())
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleTeamChange = (params) => {
    const { value } = params
    if (value.length > 0) {
      setTeamId(value[0].id)
      setSelectedTeamName(value[0].label)
    }
  }

  useEffect(() => {
    setPrimaryColor(selectPrimaryColor(selectedTeamName))
    setSecondaryColor(selectSecondaryColor(selectedTeamName))
    updateTeam(selectedTeamName)
  }, [selectedTeamName, teams])

  function selectPrimaryColor(selectedTeamName) {
    for (let i = 0; i < teamOptions.length; i++) {
      if (teamOptions[i].label === selectedTeamName) return primaryColors[i]
    }
    return '#EA6607'
  }

  function selectSecondaryColor(selectedTeamName) {
    for (let i = 0; i < teamOptions.length; i++) {
      if (teamOptions[i].label === selectedTeamName) return secondaryColors[i]
    }
    return '#000000'
  }

  function updateTeam(selectedTeamName) {
    if (teams && teams.teams && teams.teams.length > 0) {
      const team = teams.teams.find((t) => t.team.displayName === selectedTeamName)
      if (team) {
        setTeam(team.team)
      }
    }
  }
  // console.log("TEST",eventIds)
  return (
    <Block className="parent" style={{ position: 'relative', zIndex: 0 }}>
      <Block className="left">
        <Block className="team__logo" $style={{ flexGrow: 1, marginLeft: `${marginLeft + 15}px` }}>
          <Avatar
            overrides={{
              Avatar: {
                style: ({ $theme }) => ({
                  borderRadius: '0',
                  width: 'auto',
                  objectFit: 'contain',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  zIndex: 1,
                }),
              },
              Root: {
                style: ({ $theme }) => ({
                  borderRadius: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'visible',
                  width: '120px',
                  height: '120px',
                  backgroundColor: 'black',
                }),
              },
            }}
            name={team && team.displayName ? team.displayName : ''}
            size="100px"
            src={team && team.logos && team.logos[0] ? team.logos[0].href : ''}
          />
        </Block>
      </Block>
      <Block className="backgroundWrapper" backgroundColor={primaryColor}>
        <Block className="middle">
          <Block className="team">
            <HeadingLevel>
              <Heading
                styleLevel={1}
                marginTop="10px"
                color={secondaryColor}
                style={{ fontFamily: 'inherit' }}
              >
                {selectedTeamName ? selectedTeamName : ''}
              </Heading>
            </HeadingLevel>
          </Block>
          <Block className="teamsItems">
            <TeamRecordWNBA teamRecord={teamRecord} />
            <TeamPlayerCardsWNBA
              team={team}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              teamName={selectedTeamName}
              players={players}
            />
          </Block>
        </Block>
        {eventIds ? (
          <Block
            key={0}
            className="odds"
            justifyContent="center"
            alignItems="center"
            display="flex"
            marginTop="-70px"
          >
            <Block className="oddsl2">
              <GameOddsRostersWNBA eventId={eventIds[0]} teamName={selectedTeamName} />
            </Block>
          </Block>
        ) : (
          <></>
        )}
      </Block>
      <Block className="right">
        <Block
          className="Selector"
          display="flex"
          justifyContent="center"
          marginBottom="70px"
          $style={{ marginRight: `${marginLeft + 6}px` }}
        >
          <Block marginRight="10px" paddingTop="10px">
            <Select
              options={teamOptions}
              labelKey="label"
              valueKey="id"
              onChange={handleTeamChange}
              value={[{ id: '0', label: 'Team' }]}
              placeholder={<Block> &nbsp;&nbsp;&nbsp;Team&nbsp;&nbsp; </Block>}
              clearable={false}
              overrides={{
                ControlContainer: {
                  style: {
                    minHeight: '35px',
                    height: '35px',
                    paddingLeft: '15px',
                    paddingRight: '5px',
                    borderRadius: '8px',
                    cursor: 'default',
                  },
                },
                ValueContainer: { style: { minHeight: '30px', height: '30px', padding: '0px' } },
                Placeholder: { style: { lineHeight: '30px' } },
                SingleValue: { style: { lineHeight: '30px' } },
                OptionContent: { style: { cursor: 'default' } },
                DropdownContainer: { style: { cursor: 'default' } },
                DropdownListItem: { style: { cursor: 'default' } },
                InputContainer: { style: { cursor: 'default' } },
                Input: { style: { cursor: 'default' } },
                Root: { style: { width: '122px' } },
              }}
            />
          </Block>
        </Block>
      </Block>
    </Block>
  )
}

export default WNBATeams
