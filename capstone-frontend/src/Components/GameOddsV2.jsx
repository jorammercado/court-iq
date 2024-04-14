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
  HeadingSmall,
  HeadingXSmall
} from "baseui/typography";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Block } from 'baseui/block';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';

const NBAGameOddsV2 = ({ eventId }) => {
  const [flattenedProps, setFlattenedProps] = useState([]);
  const [playerProps, setPlayerProps] = useState([[]]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState([])
  const [bookmaker, setBookmaker] = useState([])
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
          setAwayTeam(response.data.away_team);
          setHomeTeam(response.data.home_team);
          setCommenceTime(response.data.commence_time);

          const allBookmakers = response.data.bookmakers.map(bookmaker => {
            return {
              bookmaker: bookmaker.title,
              lastUpdate: bookmaker.markets && bookmaker.markets.length > 0 ? bookmaker.markets[0].last_update : 'No update',
              playerProps: bookmaker.markets && bookmaker.markets.length > 0 ? bookmaker.markets[0].outcomes : []
            };
          });

          setBookmaker(allBookmakers.map(b => b.bookmaker));
          setLastUpdate(allBookmakers.map(b => b.lastUpdate));
          setPlayerProps(allBookmakers.map(b => b.playerProps));

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

  useEffect(() => {
    const newFlattenedProps = playerProps.flatMap((propsArray, index) =>
      propsArray.map(prop => ({
        ...prop,
        bookmaker: bookmaker[index],
        lastUpdate: lastUpdate[index]
      }))
    );

    setFlattenedProps(newFlattenedProps);
  }, [playerProps, bookmaker, lastUpdate]);

  // console.log("Player props: ", playerProps)

  if (isLoading) return <></>;

  return (
    <div>
      {flattenedProps && flattenedProps.length > 0 ? (
        <Block className="oddsContain">
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
                {commenceTime ? new Date(commenceTime).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0] : ""} &nbsp;
                {commenceTime ? new Date(commenceTime).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[1].replace(/:00(?=\s?(AM|PM)$)/, '') + " EST" : ""}
              </Heading>
            </HeadingLevel>
          </Block>
          <Block className="scheduleTable">
            <TableBuilder data={flattenedProps}
              overrides={{ Root: { style: { maxHeight: "500px" } } }}>
              <TableBuilderColumn header="Bookmaker">
                {row => <span style={{
                  color: row && row.bookmaker && row.bookmaker === "DraftKings" ? drafKingsColors[0] : "inherit",
                  fontFamily: row && row.bookmaker && row.bookmaker === "DraftKings" ? draftFamily : "inherit",
                  fontSize: row && row.bookmaker && row.bookmaker === "DraftKings" ? "19px" : "inherit"
                }}>{row && row.bookmaker && row.bookmaker === "DraftKings" ?
                  <img width="18" height="18" src="https://img.icons8.com/color-glass/48/medieval-crown.png" alt="medieval-crown" /> :
                  <></>
                  }
                  {row && row.bookmaker ? row.bookmaker : "bookmaker"}
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
                  {row && row.lastUpdate ? new Date(lastUpdate[0]).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0]+", " : ""}
                  {row && row.lastUpdate ? new Date(lastUpdate[0]).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[1].replace(/:00(?=\s?(AM|PM)$)/, '') + " EST" : ""}
                </div>}
              </TableBuilderColumn>
            </TableBuilder>
          </Block>
        </Block>) : (
        <Block display="flex" justifyContent="flex-start" alignItems="center" marginTop="10px">
          <HeadingXSmall backgroundColor="black" padding="10px 15px" width="100%" >
            No Player Props currently available for this team, try another team.
          </HeadingXSmall>
        </Block>
      )}
    </div>
  );
};


export default NBAGameOddsV2;
