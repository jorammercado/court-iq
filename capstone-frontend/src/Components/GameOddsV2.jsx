import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component
import "./GameOdds.scss"

const NBAGameOddsV2 = ({ eventId }) => { // eventId passed as a prop
  const [playerProps, setPlayerProps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_ODDS_API_KEY;
    const fetchPlayerProps = async (eventId) => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/basketball_nba/events/${eventId}/odds`, {
          params: { apiKey, regions: 'us', markets: 'player_points', oddsFormat: 'american' },
        });
       
        // Assuming the structure of your response and extracting player points props
        const pointsProps = response.data.bookmakers
          .flatMap(bookmaker => bookmaker.markets.filter(market => market.key === 'player_points'))
          .flatMap(market => market.outcomes.map(outcome => ({
            name: outcome.name,
            price: outcome.price,
            point: outcome.point, // Assuming there's a `point` for over/under
          })));
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 style={{color:'white'}}>Player Points Props</h2>
      {playerProps.map((prop, index) => (
        <div style={{color:'white'}} key={index}>
          <p>{prop.name}: {prop.point} @ {prop.price}</p>
        </div>
      ))}
    </div>
  );
};


export default NBAGameOddsV2;
