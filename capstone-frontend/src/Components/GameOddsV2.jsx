import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './CardPlayerProps'; // Import the Card component
import "./GameOdds.scss"
import Spin from './SpinLoad';

const NBAGameOddsV2 = ({ eventId }) => { // eventId passed as a prop
  const [playerProps, setPlayerProps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState('')
  const [bookmaker, setBookmaker] = useState('')

  useEffect(() => {
    const apiKey = import.meta.env.VITE_ODDS_API_KEY;
    const fetchPlayerProps = async (eventId) => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/basketball_nba/events/${eventId}/odds`, {
          params: { apiKey, regions: 'us', markets: 'player_points', oddsFormat: 'american' },
        });
        console.log("TTTTTTTTTTTTTTTTHHHHHHHHHHHHHHHHHH", response)
        //  setLastUpdate(response.data.bookmaker.title)
        //  setBookmaker(response.data.bookmaker.markets[0].last_update)
        // Assuming the structure of your response and extracting player points props
        const pointsProps = response.data.bookmakers[0].markets[0].outcomes

        console.log(pointsProps)
        setPlayerProps(pointsProps);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchPlayerProps(eventId);
    }
  }, [eventId]);

  if (isLoading) return <Spin></Spin>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 style={{ width: '100%', color: 'white', textAlign: 'center' }}>Player Points Props</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '10px',
        color: 'white'
      }} >
        {/* {bookmaker?<h1 style={{color:'white'}} > Bookermaker: {bookmaker} </h1>:<></>}
      {lastUpdate?<h1 style={{color:'white'}} > Last Update: {lastUpdate} </h1>:<></>} */}

        {playerProps.map((prop, index) => (
          <Card
            key={index}
            title={prop.description}
            propName={prop.name}
            propPoint={prop.point}
            propPrice={prop.price}
          />
        ))}
      </div>
    </div>
  );
};


export default NBAGameOddsV2;
