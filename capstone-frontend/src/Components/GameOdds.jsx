import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./GameOdds.scss"

const NBAGameOdds = () => {
  const [draftKingsOdds, setDraftKingsOdds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOdds = async () => {
      setIsLoading(true);
      const apiKey = import.meta.env.VITE_ODDS_API_KEY;
      const sport = 'basketball_nba'; // Correct sport key based on your API's documentation
      const regions = 'us';
      const markets = 'h2h';

      try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sport}/odds/`, {
          params: { apiKey, regions, markets },
        });

        const draftKingsBets = response.data.map(game => {
          const draftKingsMarket = game.bookmakers.find(bookmaker => bookmaker.key === 'draftkings');
          if (draftKingsMarket) {
            const h2hMarket = draftKingsMarket.markets.find(market => market.key === 'h2h');
            if (h2hMarket) {
              return {
                game: game.away_team,
                odds: h2hMarket.outcomes.map(outcome => ({
                  team: outcome.name,
                  price: outcome.price,
                })),
              };
            }
          }
          return null;
        }).filter(Boolean); 

        console.log(draftKingsBets); 
        setDraftKingsOdds(draftKingsBets);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOdds();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="ContentGame">
      <h2>NBA Game Odds</h2>
      
      {draftKingsOdds.map((game, index) => (
        <div className="ContentGameOdds"key={index}>
          <h3>{game.game} </h3>
          {game.odds.map((outcome, index) => (
            <p key={index}>{outcome.team}: {outcome.price}</p>
          ))}
          
        </div>
        
      ))}
    </div>
  );
};

export default NBAGameOdds;
