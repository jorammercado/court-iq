import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './CardPlayerProps'; // Import the Card component
import "./GameOddsV2.scss"
import Spin from './SpinLoad';
import "../App.scss"
const draftFamily = 'draftkings'
const fanDuelFamily = 'fanduel'
const caesarsFamily = 'caesars'
const bovadaFamily = 'bovada'
const drafKingsColors = ["#9AC434", "#F46C22", "#D8D8D8", "#000000 "]
const fanDuelColors = ["#1381E0", "#818E95", "#1F375B", "#0E67B3"]
const caesarsColors = ["#cbaa65"]
const bovadaColors = ["#cc0000"]
const pointsbetColors = ["#ED1B42"]
const betmgmColors = ["#bda871"]
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
import fan from "../assets/fanduel.png"
import pointsbet from "../assets/logopointsbet.png"
import betmgm from "../assets/betmgm.png"
const API = import.meta.env.VITE_BASE_URL

const NBAGameOddsV2 = ({ eventId, teamName }) => {
  const [flattenedProps, setFlattenedProps] = useState([]);
  const [flattenedPropsDemo, setFlattenedPropsDemo] = useState([]);
  const [playerProps, setPlayerProps] = useState([[]]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState([])
  const [bookmaker, setBookmaker] = useState([])
  const [awayTeam, setAwayTeam] = useState('')
  const [homeTeam, setHomeTeam] = useState('')
  const [commenceTime, setCommenceTime] = useState('')
  const [awayTeamDemo, setAwayTeamDemo] = useState('')
  const [homeTeamDemo, setHomeTeamDemo] = useState('')
  const [commenceTimeDemo, setCommenceTimeDemo] = useState('')

  useEffect(() => {
    fetch(`${API}/teamspagepropsheading`)
      .then(response => response.json())
      .then(data => {
        setAwayTeamDemo(data[0].away_team)
        setHomeTeamDemo(data[0].home_team)
        setCommenceTimeDemo(data[0].commence_time)
      })
      .catch(() => navigate("/not-found"))
  }, [])

  useEffect(() => {
    fetch(`${API}/teamspageprops`)
      .then(response => response.json())
      .then(data => {
        setFlattenedPropsDemo(data)
      })
      .catch(() => navigate("/not-found"))
  }, [])

  useEffect(() => {
    const apiKey = import.meta.env.VITE_ODDS_API_KEY;
    const fetchPlayerProps = async (eventId) => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/basketball_nba/events/${eventId}/odds`, {
          params: { apiKey, regions: 'us', markets: 'player_points', oddsFormat: 'american' },
        });
        //console.log("All Response = ", response)
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

    // saveDataLocally(commenceTime, awayTeam, homeTeam, newFlattenedProps);
  }, [playerProps, bookmaker, lastUpdate]);

  // save data for demo day
  const saveDataLocally = (commenceTime, awayTeam, homeTeam, flattenedProps) => {
    const dataToSave = {
      commenceTime,
      awayTeam,
      homeTeam,
      flattenedProps
    };

    const jsonData = JSON.stringify(dataToSave);
    const fileName = 'data.json';
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <div>
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
                  {row => {
                    const isDraftKings = row && row.bookmaker === "DraftKings";
                    const isFanDuel = row && row.bookmaker === "FanDuel";
                    const isCaesars = row && row.bookmaker === "Caesars";
                    const isBovada = row && row.bookmaker === "Bovada";
                    const isPointsBet = row && row.bookmaker === "PointsBet (US)";
                    const isBetMGM = row && row.bookmaker === "BetMGM";

                    const style = {
                      color: isDraftKings ? drafKingsColors[0] : isFanDuel ? fanDuelColors[0] : isCaesars ? caesarsColors[0] : isBovada ? bovadaColors[0] : isPointsBet ? pointsbetColors[0] : isBetMGM ? betmgmColors[0] : "inherit",
                      fontFamily: isDraftKings ? draftFamily : isFanDuel ? fanDuelFamily : isCaesars ? caesarsFamily : isBovada ? bovadaFamily : isPointsBet ? caesarsFamily : isBetMGM ? caesarsFamily : "inherit",
                      fontSize: isDraftKings ? "8.5px" : isFanDuel ? "18px" : isCaesars ? "18px" : isBovada ? "18px" : isBetMGM ? "18px" : "inherit"
                    };

                    let imageContent = null;
                    if (isDraftKings) {
                      imageContent = <img width="18" height="18" src="https://img.icons8.com/color-glass/48/medieval-crown.png" alt="DraftKings crown" />;
                    } else if (isFanDuel) {
                      imageContent = <img width="18" height="18" src={fan} alt="FanDuel logo" />;
                    } else if (isCaesars) {
                      imageContent = (
                        <svg width="18" height="18" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h512v512h-512z" /><path d="m264.234 33.64a94.945 94.945 0 0 0 -10.957.608c-62.382 7.128-121.457 58.812-152.302 118.508.118-.095.234-.193.353-.287l7.463-5.899 5.477 7.778c1.554 2.208 2.872 4.663 4.033 7.34 7.928-17.487 21.63-34.571 40.363-46.084l7.61-4.676 4.734 7.572c2.502 4.003 4.31 8.702 5.713 14.016 9.889-16.645 25.602-32.252 45.758-41.608l8.101-3.76 3.822 8.073c.153.323.298.652.442.982 9.782-13.132 23.275-24.935 39.728-32.572l8.102-3.762 3.822 8.072c1.356 2.864 2.351 6.017 3.104 9.416 8.43-10.724 19.573-20.548 32.812-27.744-18.601-9.895-38.4-15.936-58.178-15.972zm140.498 19.813c-21.58 4.89-40.88 18.458-50.029 31.264-5.337 7.47-6.704 14.015-5.808 17.388.895 3.374 3.457 6.667 14.306 8.53 3.785.65 8.053-.756 13.291-5.094 5.239-4.338 10.728-11.384 15.358-19.36 4.629-7.974 8.462-16.865 10.949-24.75.915-2.9 1.414-5.45 1.933-7.978zm-71.066 10.74c-19.686 10.104-35.007 28.047-40.684 42.725-1.002 2.592-1.669 5.007-2.07 7.205-.134 1.34-.288 2.68-.46 4.022-.123 3.113.378 5.538 1.23 7.058 1.706 3.045 5.005 5.597 15.976 4.703 3.827-.312 7.612-2.734 11.608-8.238 3.995-5.505 7.56-13.695 10.06-22.57 2.5-8.876 4-18.44 4.45-26.696.164-3.037.016-5.63-.11-8.209zm-61.148 21.221c-15.32 10.048-27.077 25.116-32.995 38.63.178 8.541-.428 17.78-1.966 26.833-.003.02-.008.039-.012.059 2.075 2.643 5.784 4.535 16.084 2.58 3.772-.716 7.28-3.525 10.668-9.422 3.388-5.898 6.065-14.421 7.61-23.512 1.544-9.09 2.021-18.762 1.591-27.018-.158-3.037-.581-5.6-.98-8.15zm-52.096 27.28c-18.503 12.135-31.833 31.6-35.92 46.798-2.384 8.867-1.373 15.474.646 18.32 2.02 2.847 5.57 5.036 16.385 2.983 3.773-.716 7.28-3.527 10.668-9.424 3.389-5.897 6.065-14.419 7.61-23.51 1.544-9.09 2.021-18.761 1.591-27.017-.158-3.038-.581-5.6-.98-8.15zm172.715 1.915a64.957 64.957 0 0 1 -5.164 4.795c-7.692 6.37-17.404 10.759-27.819 8.971a53.37 53.37 0 0 1 -5.308-1.19c-.211.553-.393 1.083-.545 1.585 9.883 3.882 19.338 8.95 27.293 14.312.488.329.951.657 1.427.986 14.312-1.453 31.422-7.418 45.325-17.963-2.27-1.23-4.543-2.485-7.352-3.652-7.635-3.17-16.909-5.96-25.992-7.549-.624-.109-1.244-.198-1.865-.295zm-233.983 22.87c-16.968 14.203-27.946 35.087-30.238 50.658-1.337 9.083.435 15.528 2.772 18.12 2.336 2.593 6.118 4.353 16.62 1.057 3.664-1.15 6.82-4.348 9.5-10.6 2.68-6.25 4.35-15.025 4.827-24.234.477-9.208-.174-18.869-1.56-27.02-.511-2.998-1.228-5.495-1.92-7.981zm167.551 2.595c-4.894 4.226-10.774 7.219-17.586 7.774-.776.063-1.542.098-2.305.129-4.164 5.764-3.952 9.104-2.789 11.761 1.4 3.198 6.544 7.467 15.371 9.99 15.132 4.326 38.685 2.928 58.618-6.681-1.981-1.656-3.96-3.338-6.483-5.04-6.855-4.62-15.39-9.193-23.978-12.552-7.288-2.85-14.632-4.777-20.848-5.38zm86.656 15.182a106.836 106.836 0 0 1 -13.511 4.318c.112.164.23.326.34.49l4.949 7.434-7.397 5.006c-20.412 13.818-44.598 18.985-65.494 17.557 1.179 1.786 2.212 3.592 3.055 5.435l3.713 8.123-8.094 3.776c-18.069 8.427-37.682 10.878-55.32 9.015 3.324 5.162 5.82 10.156 7.115 15.174l2.232 8.648-8.63 2.3c-16.504 4.394-33.356 4.273-48.56 1.052 2.399 4.105 4.226 8.128 5.268 12.166l2.233 8.648-8.631 2.3c-17.359 4.621-35.103 4.246-50.908.525 3.2 5.494 5.503 10.687 6.41 16.017l1.59 9.344-9.414 1.103c-29.326 3.442-58.181-6.708-75.637-21.18-4.087-3.387-7.717-7.113-10.414-11.218 17.989 59.19 62.717 123.576 62.717 123.576l-35.479 68.797c49.496 25.554 105.19 38.708 170.56 32.514-1.767-32.096 16.473-55.814 33.022-74.514-14.59-.975-29.987-2.226-44.846-5.064-16.51-3.155-32.54-8.341-46.003-18.032-13.464-9.69-24.033-24.105-28.956-43.7l17.458-4.387c3.99 15.88 11.622 26 22.011 33.478 10.39 7.478 23.863 12.094 38.87 14.961 25.516 4.875 54.75 4.428 79.554 7.643 26.748-2.02 57.07 2.601 63.441-8.596 15.568-27.36 5.054-63.93-3.44-92.492 18.463-.61 28.178-1.69 38.735-4.967-8.607-34.5-21.86-54.883-43.703-73.5 1.629-20.453 4.194-42.05 1.164-61.75zm-143.705 10.031c-3.632 2.872-7.843 4.998-12.672 5.914-5.147.977-10.06 1.154-14.574.598-2.391 3.278-2.569 5.739-2.08 7.879 3.149 2.201 6.213 4.6 9.176 7.135a140.092 140.092 0 0 1 7.195 6.628c14.405 5.749 36.32 7.451 56.233 1.496-1.694-1.947-3.382-3.92-5.604-5.998-6.039-5.646-13.746-11.51-21.695-16.183-5.387-3.167-10.897-5.746-15.979-7.469zm-165.892 9.828c-12.164 13.92-19.414 32.558-20.184 46.215-.47 8.343 1.653 14.076 3.498 15.916 1.846 1.84 4.091 3.065 12.469-.613 2.48-1.089 4.922-4.003 6.73-9.848s2.59-13.96 2.32-22.369c-.268-8.409-1.532-17.143-3.308-24.436-.448-1.84-1.006-3.23-1.525-4.865zm117.484 14.098c-4.367 4.56-9.797 8.02-16.357 9.266-4.519.857-8.861 1.105-12.909.779.005.14.01.28.02.418.17 2.194 1.611 5.283 4.533 8.59 1.106.886 2.201 1.789 3.281 2.713a137.466 137.466 0 0 1 3.963 3.544c12.956 8.865 35.325 15.08 57.012 12.59-1.326-2.214-2.642-4.454-4.465-6.888-4.955-6.618-11.512-13.74-18.52-19.735-5.473-4.682-11.249-8.637-16.558-11.277zm-51.684 23.215c-3.888 5.477-9.097 9.938-15.865 12.062-3.643 1.144-7.216 1.857-10.646 2.15 1.39 3.355 4.753 7.65 10.494 11.69 12.87 9.058 35.571 15.474 57.555 12.95-1.327-2.215-2.642-4.455-4.465-6.89-4.956-6.617-11.515-13.74-18.522-19.734-6.165-5.274-12.72-9.645-18.55-12.228zm-48.607 26.136c-2.982 6.2-7.496 11.62-14.174 14.551-.504.222-1.01.415-1.515.615a34.936 34.936 0 0 0 4.89 4.92c10.574 8.766 29.946 16.537 49.654 17.452-.717-1.297-1.208-2.436-2.085-3.8-3.937-6.115-9.315-12.875-15.207-18.734-5.892-5.858-12.349-10.798-18.014-13.533a32.419 32.419 0 0 0 -3.549-1.47zm-48.676 9.061-33.43 21.395 9.704 15.162 38.591-24.698a30.468 30.468 0 0 1 -1.767-3.634c-4.235-.94-8.022-2.876-11.012-5.858a26.53 26.53 0 0 1 -2.086-2.367z" fill="#fff" /></svg>
                      );
                    }
                    else if (isBovada) {
                      imageContent = (
                        <svg
                          width="15" height="15"
                          viewBox="0 0 5000 5000"
                          style={{ enableBackground: "new 0 0 5000 5000", backgroundColor: "white" }}
                          y="0px"
                          x="0px"
                          id="Layer_1"
                        >
                          <path
                            id="path2"
                            d="M2583.61,2135.69l-8.06-3c-513.97-178.94-653.08-422.99-656.54-535.14l1.13-140.2h640.42l6.09-0.09 c2.33,0,134.39,4.41,198.8,92.65c6.53,9.09,12.8,19.58,18.75,30.79l0.09-0.09c62.18,115.85,86.73,342.7-54.56,616.31 C2683.34,2176.1,2635.14,2155.63,2583.61,2135.69 M3154.6,2443.97c222.67-578.73,192.01-946.13,13.14-1191.42 c-211.54-290.02-554.16-297.26-609.06-297.7h-1137.6v607.39c-5.17,138.18,34.17,710.38,987.19,1043.9 c524.11,214.14,679.91,400.7,674.92,643.4c-5,242.73-192.1,285.16-274.45,293.1h-887.98v-991.12l-75.55-50.83 c-206.89-136.06-338.86-285.17-423.48-422.73v1967.17H2825.6l7.14-0.44c294.6-17.02,736.35-260.2,746.17-774.77 C3580.32,3101.23,3595.04,2781.9,3154.6,2443.97"
                          />
                        </svg>
                      )
                    }
                    else if (isPointsBet) {
                      imageContent = <img width="18" height="18" src={pointsbet} alt="pointsbet" />;
                    }
                    else if (isBetMGM) {
                      imageContent = <img width="18" height="18" src={betmgm} alt="pointsbet" />;
                    }

                    return (
                      <span style={style}>
                        {imageContent}
                        {row && row.bookmaker ? row.bookmaker : "bookmaker"}
                      </span>
                    );
                  }}
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
                    {row && row.lastUpdate ? new Date(row.lastUpdate).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0] + ", " : ""}
                    {row && row.lastUpdate ? new Date(row.lastUpdate).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[1].replace(/:00(?=\s?(AM|PM)$)/, '') + " EST" : ""}
                  </div>}
                </TableBuilderColumn>
              </TableBuilder>
            </Block>
          </Block>) : (
          <Block display="flex" justifyContent="center" alignItems="center" marginTop="10px">
            <HeadingXSmall backgroundColor="black" padding="10px 15px" width="100%" >
              No Player Props currently available for this team, try another team.
            </HeadingXSmall>
          </Block>
        )}
      </div>
      <div >
        {flattenedPropsDemo && flattenedPropsDemo.length > 0 && ((teamName && teamName === "New York Knicks") || ( teamName && teamName === "Philadelphia 76ers")) ? (
          <div style={{ marginTop: "50px", paddingBottom: "75px" }}>
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
                  }} >Demo Day Old Data (knicks) - Player Props</Heading>
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
                    Visitor: &nbsp; {awayTeamDemo ? awayTeamDemo : ""}, &nbsp; Home: &nbsp; {homeTeamDemo ? homeTeamDemo : ""}, &nbsp; Commence: &nbsp;
                    {commenceTimeDemo ? new Date(commenceTimeDemo).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0] : ""} &nbsp;
                    {commenceTimeDemo ? new Date(commenceTimeDemo).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[1].replace(/:00(?=\s?(AM|PM)$)/, '') + " EST" : ""}
                  </Heading>
                </HeadingLevel>
              </Block>
              <Block className="scheduleTable">
                <TableBuilder data={flattenedPropsDemo}
                  overrides={{ Root: { style: { maxHeight: "500px" } } }}>
                  <TableBuilderColumn header="Bookmaker">
                    {row => {
                      const isDraftKings = row && row.bookmaker === "DraftKings";
                      const isFanDuel = row && row.bookmaker === "FanDuel";
                      const isCaesars = row && row.bookmaker === "Caesars";
                      const isBovada = row && row.bookmaker === "Bovada";
                      const isPointsBet = row && row.bookmaker === "PointsBet (US)";
                      const isBetMGM = row && row.bookmaker === "BetMGM";

                      const style = {
                        color: isDraftKings ? drafKingsColors[0] : isFanDuel ? fanDuelColors[0] : isCaesars ? caesarsColors[0] : isBovada ? bovadaColors[0] : isPointsBet ? pointsbetColors[0] : isBetMGM ? betmgmColors[0] : "inherit",
                        fontFamily: isDraftKings ? draftFamily : isFanDuel ? fanDuelFamily : isCaesars ? caesarsFamily : isBovada ? bovadaFamily : isPointsBet ? caesarsFamily : isBetMGM ? caesarsFamily : "inherit",
                        fontSize: isDraftKings ? "8.5px" : isFanDuel ? "18px" : isCaesars ? "18px" : isBovada ? "18px" : isBetMGM ? "18px" : "inherit"
                      };

                      let imageContent = null;
                      if (isDraftKings) {
                        imageContent = <img width="18" height="18" src="https://img.icons8.com/color-glass/48/medieval-crown.png" alt="DraftKings crown" />;
                      } else if (isFanDuel) {
                        imageContent = <img width="18" height="18" src={fan} alt="FanDuel logo" />;
                      } else if (isCaesars) {
                        imageContent = (
                          <svg width="18" height="18" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m0 0h512v512h-512z" /><path d="m264.234 33.64a94.945 94.945 0 0 0 -10.957.608c-62.382 7.128-121.457 58.812-152.302 118.508.118-.095.234-.193.353-.287l7.463-5.899 5.477 7.778c1.554 2.208 2.872 4.663 4.033 7.34 7.928-17.487 21.63-34.571 40.363-46.084l7.61-4.676 4.734 7.572c2.502 4.003 4.31 8.702 5.713 14.016 9.889-16.645 25.602-32.252 45.758-41.608l8.101-3.76 3.822 8.073c.153.323.298.652.442.982 9.782-13.132 23.275-24.935 39.728-32.572l8.102-3.762 3.822 8.072c1.356 2.864 2.351 6.017 3.104 9.416 8.43-10.724 19.573-20.548 32.812-27.744-18.601-9.895-38.4-15.936-58.178-15.972zm140.498 19.813c-21.58 4.89-40.88 18.458-50.029 31.264-5.337 7.47-6.704 14.015-5.808 17.388.895 3.374 3.457 6.667 14.306 8.53 3.785.65 8.053-.756 13.291-5.094 5.239-4.338 10.728-11.384 15.358-19.36 4.629-7.974 8.462-16.865 10.949-24.75.915-2.9 1.414-5.45 1.933-7.978zm-71.066 10.74c-19.686 10.104-35.007 28.047-40.684 42.725-1.002 2.592-1.669 5.007-2.07 7.205-.134 1.34-.288 2.68-.46 4.022-.123 3.113.378 5.538 1.23 7.058 1.706 3.045 5.005 5.597 15.976 4.703 3.827-.312 7.612-2.734 11.608-8.238 3.995-5.505 7.56-13.695 10.06-22.57 2.5-8.876 4-18.44 4.45-26.696.164-3.037.016-5.63-.11-8.209zm-61.148 21.221c-15.32 10.048-27.077 25.116-32.995 38.63.178 8.541-.428 17.78-1.966 26.833-.003.02-.008.039-.012.059 2.075 2.643 5.784 4.535 16.084 2.58 3.772-.716 7.28-3.525 10.668-9.422 3.388-5.898 6.065-14.421 7.61-23.512 1.544-9.09 2.021-18.762 1.591-27.018-.158-3.037-.581-5.6-.98-8.15zm-52.096 27.28c-18.503 12.135-31.833 31.6-35.92 46.798-2.384 8.867-1.373 15.474.646 18.32 2.02 2.847 5.57 5.036 16.385 2.983 3.773-.716 7.28-3.527 10.668-9.424 3.389-5.897 6.065-14.419 7.61-23.51 1.544-9.09 2.021-18.761 1.591-27.017-.158-3.038-.581-5.6-.98-8.15zm172.715 1.915a64.957 64.957 0 0 1 -5.164 4.795c-7.692 6.37-17.404 10.759-27.819 8.971a53.37 53.37 0 0 1 -5.308-1.19c-.211.553-.393 1.083-.545 1.585 9.883 3.882 19.338 8.95 27.293 14.312.488.329.951.657 1.427.986 14.312-1.453 31.422-7.418 45.325-17.963-2.27-1.23-4.543-2.485-7.352-3.652-7.635-3.17-16.909-5.96-25.992-7.549-.624-.109-1.244-.198-1.865-.295zm-233.983 22.87c-16.968 14.203-27.946 35.087-30.238 50.658-1.337 9.083.435 15.528 2.772 18.12 2.336 2.593 6.118 4.353 16.62 1.057 3.664-1.15 6.82-4.348 9.5-10.6 2.68-6.25 4.35-15.025 4.827-24.234.477-9.208-.174-18.869-1.56-27.02-.511-2.998-1.228-5.495-1.92-7.981zm167.551 2.595c-4.894 4.226-10.774 7.219-17.586 7.774-.776.063-1.542.098-2.305.129-4.164 5.764-3.952 9.104-2.789 11.761 1.4 3.198 6.544 7.467 15.371 9.99 15.132 4.326 38.685 2.928 58.618-6.681-1.981-1.656-3.96-3.338-6.483-5.04-6.855-4.62-15.39-9.193-23.978-12.552-7.288-2.85-14.632-4.777-20.848-5.38zm86.656 15.182a106.836 106.836 0 0 1 -13.511 4.318c.112.164.23.326.34.49l4.949 7.434-7.397 5.006c-20.412 13.818-44.598 18.985-65.494 17.557 1.179 1.786 2.212 3.592 3.055 5.435l3.713 8.123-8.094 3.776c-18.069 8.427-37.682 10.878-55.32 9.015 3.324 5.162 5.82 10.156 7.115 15.174l2.232 8.648-8.63 2.3c-16.504 4.394-33.356 4.273-48.56 1.052 2.399 4.105 4.226 8.128 5.268 12.166l2.233 8.648-8.631 2.3c-17.359 4.621-35.103 4.246-50.908.525 3.2 5.494 5.503 10.687 6.41 16.017l1.59 9.344-9.414 1.103c-29.326 3.442-58.181-6.708-75.637-21.18-4.087-3.387-7.717-7.113-10.414-11.218 17.989 59.19 62.717 123.576 62.717 123.576l-35.479 68.797c49.496 25.554 105.19 38.708 170.56 32.514-1.767-32.096 16.473-55.814 33.022-74.514-14.59-.975-29.987-2.226-44.846-5.064-16.51-3.155-32.54-8.341-46.003-18.032-13.464-9.69-24.033-24.105-28.956-43.7l17.458-4.387c3.99 15.88 11.622 26 22.011 33.478 10.39 7.478 23.863 12.094 38.87 14.961 25.516 4.875 54.75 4.428 79.554 7.643 26.748-2.02 57.07 2.601 63.441-8.596 15.568-27.36 5.054-63.93-3.44-92.492 18.463-.61 28.178-1.69 38.735-4.967-8.607-34.5-21.86-54.883-43.703-73.5 1.629-20.453 4.194-42.05 1.164-61.75zm-143.705 10.031c-3.632 2.872-7.843 4.998-12.672 5.914-5.147.977-10.06 1.154-14.574.598-2.391 3.278-2.569 5.739-2.08 7.879 3.149 2.201 6.213 4.6 9.176 7.135a140.092 140.092 0 0 1 7.195 6.628c14.405 5.749 36.32 7.451 56.233 1.496-1.694-1.947-3.382-3.92-5.604-5.998-6.039-5.646-13.746-11.51-21.695-16.183-5.387-3.167-10.897-5.746-15.979-7.469zm-165.892 9.828c-12.164 13.92-19.414 32.558-20.184 46.215-.47 8.343 1.653 14.076 3.498 15.916 1.846 1.84 4.091 3.065 12.469-.613 2.48-1.089 4.922-4.003 6.73-9.848s2.59-13.96 2.32-22.369c-.268-8.409-1.532-17.143-3.308-24.436-.448-1.84-1.006-3.23-1.525-4.865zm117.484 14.098c-4.367 4.56-9.797 8.02-16.357 9.266-4.519.857-8.861 1.105-12.909.779.005.14.01.28.02.418.17 2.194 1.611 5.283 4.533 8.59 1.106.886 2.201 1.789 3.281 2.713a137.466 137.466 0 0 1 3.963 3.544c12.956 8.865 35.325 15.08 57.012 12.59-1.326-2.214-2.642-4.454-4.465-6.888-4.955-6.618-11.512-13.74-18.52-19.735-5.473-4.682-11.249-8.637-16.558-11.277zm-51.684 23.215c-3.888 5.477-9.097 9.938-15.865 12.062-3.643 1.144-7.216 1.857-10.646 2.15 1.39 3.355 4.753 7.65 10.494 11.69 12.87 9.058 35.571 15.474 57.555 12.95-1.327-2.215-2.642-4.455-4.465-6.89-4.956-6.617-11.515-13.74-18.522-19.734-6.165-5.274-12.72-9.645-18.55-12.228zm-48.607 26.136c-2.982 6.2-7.496 11.62-14.174 14.551-.504.222-1.01.415-1.515.615a34.936 34.936 0 0 0 4.89 4.92c10.574 8.766 29.946 16.537 49.654 17.452-.717-1.297-1.208-2.436-2.085-3.8-3.937-6.115-9.315-12.875-15.207-18.734-5.892-5.858-12.349-10.798-18.014-13.533a32.419 32.419 0 0 0 -3.549-1.47zm-48.676 9.061-33.43 21.395 9.704 15.162 38.591-24.698a30.468 30.468 0 0 1 -1.767-3.634c-4.235-.94-8.022-2.876-11.012-5.858a26.53 26.53 0 0 1 -2.086-2.367z" fill="#fff" /></svg>
                        );
                      }
                      else if (isBovada) {
                        imageContent = (
                          <svg
                            width="15" height="15"
                            viewBox="0 0 5000 5000"
                            style={{ enableBackground: "new 0 0 5000 5000", backgroundColor: "white" }}
                            y="0px"
                            x="0px"
                            id="Layer_1"
                          >
                            <path
                              id="path2"
                              d="M2583.61,2135.69l-8.06-3c-513.97-178.94-653.08-422.99-656.54-535.14l1.13-140.2h640.42l6.09-0.09 c2.33,0,134.39,4.41,198.8,92.65c6.53,9.09,12.8,19.58,18.75,30.79l0.09-0.09c62.18,115.85,86.73,342.7-54.56,616.31 C2683.34,2176.1,2635.14,2155.63,2583.61,2135.69 M3154.6,2443.97c222.67-578.73,192.01-946.13,13.14-1191.42 c-211.54-290.02-554.16-297.26-609.06-297.7h-1137.6v607.39c-5.17,138.18,34.17,710.38,987.19,1043.9 c524.11,214.14,679.91,400.7,674.92,643.4c-5,242.73-192.1,285.16-274.45,293.1h-887.98v-991.12l-75.55-50.83 c-206.89-136.06-338.86-285.17-423.48-422.73v1967.17H2825.6l7.14-0.44c294.6-17.02,736.35-260.2,746.17-774.77 C3580.32,3101.23,3595.04,2781.9,3154.6,2443.97"
                            />
                          </svg>
                        )
                      }
                      else if (isPointsBet) {
                        imageContent = <img width="18" height="18" src={pointsbet} alt="pointsbet" />;
                      }
                      else if (isBetMGM) {
                        imageContent = <img width="18" height="18" src={betmgm} alt="pointsbet" />;
                      }

                      return (
                        <span style={style}>
                          {imageContent}
                          {row && row.bookmaker ? row.bookmaker : "bookmaker"}
                        </span>
                      );
                    }}
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
                      {row && row.last_update ? new Date(row.last_update).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0] + ", " : ""}
                      {row && row.last_update ? new Date(row.last_update).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[1].replace(/:00(?=\s?(AM|PM)$)/, '') + " EST" : ""}
                    </div>}
                  </TableBuilderColumn>
                </TableBuilder>
              </Block>
            </Block>
          </div>) : (
          // <Block display="flex" justifyContent="center" alignItems="center" marginTop="10px">
          //   <HeadingXSmall backgroundColor="black" padding="10px 15px" width="100%" >
          //     No Player Props currently available for this team, try another team.
          //   </HeadingXSmall>
          // </Block>
          <></>
        )}
      </div>
    </div>
  );
};


export default NBAGameOddsV2;
