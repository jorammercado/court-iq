import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './CardPlayerProps'; // Import the Card component
import "./GameOddsV2.scss"
import Spin from './SpinLoad';
import "../App.scss"
const draftFamily = 'draftkings'
const drafKingsColors = ["#9AC434", "#F46C22", "#D8D8D8", "#000000 "]
import {
  LabelLarge,
  LabelMedium,
  LabelXSmall,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall
} from "baseui/typography";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Block } from 'baseui/block';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';

const NBAGameOddsV2 = ({ eventId }) => { // eventId passed as a prop
  const [playerProps, setPlayerProps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState('')
  const [bookmaker, setBookmaker] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [homeTeam, setHomeTeam] = useState('')
  const [commenceTime, setCommenceTime] = useState('')

  useEffect(() => {
    const apiKey = import.meta.env.VITE_ODDS_API_KEY;
    const fetchPlayerProps = async (eventId) => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/basketball_nba/events/${eventId}/odds`, {
          params: { apiKey, regions: 'us', markets: 'player_points', oddsFormat: 'american' },
        });
        console.log("All Response = ", response)
        if (response && response.data && response.data.bookmakers && response.data.bookmakers[0] &&
          response.data.bookmakers[0].markets && response.data.bookmakers[0].markets[0] &&
          response.data.bookmakers[0].markets[0].outcomes) {
          setAwayTeam(response.data.away_team)
          setHomeTeam(response.data.home_team)
          setCommenceTime(response.data.commence_time)
          setLastUpdate(response.data.bookmakers[0].markets[0].last_update)
          setBookmaker(response.data.bookmakers[0].title)

          const pointsProps = response.data.bookmakers[0].markets[0].outcomes

          console.log("Point Props = ", pointsProps)
          console.log("Away Team = ", response.data.away_team)
          console.log("Home Team = ", response.data.home_team)
          console.log("Commence Time = ", response.data.commence_time)
          console.log("Last Updated = ", response.data.bookmakers[0].markets[0].last_update)
          console.log("Bookmaker = ", response.data.bookmakers[0].title)
          setPlayerProps(pointsProps);
        }
        else
          throw new Error("No Props or betting closed")
      } catch (error) {
        setError(error.message);
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchPlayerProps(eventId);
    }
  }, [eventId]);

  if (isLoading) return <></>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <Block className="oddsContain" >
      <Block className="headl1" width="100%" marginBottom="0px" paddingBottom="0px">
        <HeadingLevel>
          <Heading className="headingTransition" styleLevel={3} style={{
            width: '100%',
            color: 'white',
            textAlign: 'left',
            paddingLeft: "5px",
            backgroundColor: "black",
            marginBottom: "0px", paddingBottom: "0px"
          }} >Player Props</Heading>
        </HeadingLevel>
      </Block>
      <Block className="headl2" width="100%" marginTop="0px" >
        <HeadingLevel>
          <Heading className="headingTransition" styleLevel={6} style={{
            width: '100%',
            color: 'white',
            textAlign: "justify",
            marginLeft: "0px",
            paddingLeft: "5px",
            backgroundColor: "#1f1f1f",
            borderStyle: "solid",
            borderColor: "black",
            marginBottom: "0px", paddingBottom: "0px"
          }} >
            Visitor: &nbsp; {awayTeam}, &nbsp; Home: &nbsp; {homeTeam}, &nbsp; Commence: &nbsp;
            {new Date(commenceTime).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0]} &nbsp; 
            {new Date(commenceTime).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[1].replace(/:00(?=\s?(AM|PM)$)/, '') + " EST"}
          </Heading>
        </HeadingLevel>
      </Block>
      <Block className="scheduleTable">
        <TableBuilder data={playerProps}
          overrides={{ Root: { style: { maxHeight: "500px" } } }}>
          <TableBuilderColumn header="Bookmaker">
            {/* {row => <div>{row && row.date && row.date.start ? new Date(row.date.start).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0] : ""}</div>} */}
            {row => <span style={{ fontWeight: 'normal', color: drafKingsColors[0], fontFamily: draftFamily }}>
              <img width="18" height="18" src="https://img.icons8.com/color-glass/48/medieval-crown.png" alt="medieval-crown" />
              {bookmaker}
            </span>}
          </TableBuilderColumn>

          <TableBuilderColumn header="Player">
            {row => <div>{`${row && row.description ? row.description : "n/a"}`}</div>}
          </TableBuilderColumn>
          <TableBuilderColumn header="Type">
            {row => <div>{`${row && row.name ? row.name : "n/a"}`}</div>}
          </TableBuilderColumn>
          <TableBuilderColumn header="Value">
            {row => <div>{`${row && row.point ? row.point : "n/a"}`}</div>}
          </TableBuilderColumn>
          <TableBuilderColumn header="Odds">
            {row => <div>{`${row && row.price ? row.price : "n/a"}`}</div>}
          </TableBuilderColumn>
          <TableBuilderColumn header="Category">
            {row => <div>{`Points`}</div>}
          </TableBuilderColumn>

          <TableBuilderColumn header="Last Updated">
            {row => <div>
              {new Date(lastUpdate).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0]}
              {new Date(lastUpdate).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[1].replace(/:00(?=\s?(AM|PM)$)/, '') + " EST"}
            </div>}
          </TableBuilderColumn>
        </TableBuilder>
      </Block>
    </Block>
  );
};


export default NBAGameOddsV2;
