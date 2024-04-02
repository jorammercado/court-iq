import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component
import "./GameOdds.scss"

const NBAGameOdds = () => {
  const [draftKingsOdds, setDraftKingsOdds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOdds = async () => {
      setIsLoading(true);
      const apiKey = import.meta.env.VITE_ODDS_API_KEY;
      const sport = 'basketball_nba';
      const regions = 'us';
      const markets = 'h2h';
      const oddsFormat = 'american';

      try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sport}/odds/`, {
          params: { apiKey, regions, markets, oddsFormat },
        });
        console.log("RESPONSERESPONSERESPONSE: ====",response)

        const draftKingsBets = response.data.map(game => {
          const draftKingsMarket = game.bookmakers.find(bookmaker => bookmaker.key === 'draftkings');
          if (draftKingsMarket) {
            const h2hMarket = draftKingsMarket.markets.find(market => market.key === 'h2h');
            if (h2hMarket) {
              console.log("TTTTTTTTTTTT: ", h2hMarket)
              return {
                game: game.away_team, // Assuming you want to use away_team as title
                odds: h2hMarket.outcomes.map(outcome => ({
                  team: outcome.name,
                  price: outcome.price > 0 ? `+${outcome.price}` : outcome.price.toString(), // Add plus sign for positive odds
                })),
              };
            }
          }
          return null;
        }).filter(Boolean);

        setDraftKingsOdds(draftKingsBets);
      } catch (error) {
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
    <div className='ContentGameOdds'>
      {draftKingsOdds.map((game, index) => (
        <Card key={index} title={game.game} odds={game.odds} />
      ))}
    </div>
  );
};

export default NBAGameOdds;
