import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component
import "./GameOdds.scss";

const NBAGameOdds = ({ teamData }) => {
  const [draftKingsOdds, setDraftKingsOdds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("this is the teamData", teamData)

  useEffect(() => {
    const fetchOdds = async () => {
      const apiKey = import.meta.env.VITE_ODDS_API_KEY;
      const sport = 'basketball_nba';
      const regions = 'us';
      const markets = 'h2h';
      const oddsFormat = 'american';

      try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sport}/odds/`, {
          params: { apiKey, regions, markets, oddsFormat },
        });
        console.log("API Response:", response.data);

        const enrichedOdds = response.data.map(game => {
          const bookmaker = game.bookmakers.find(b => b.key === 'draftkings');
          const market = bookmaker?.markets.find(m => m.key === 'h2h');
          if (market) {
            return {
              homeTeam: game.home_team,
              awayTeam: game.away_team,
              odds: market.outcomes.map(outcome => ({
                team: outcome.name,
                price: outcome.price > 0 ? `+${outcome.price}` : outcome.price.toString(),
              })),
              additionalData: game.commence_time,
              homeLogo: teamData.eastern.find(t => t.name === game.home_team)?.logo || teamData.western.find(t => t.name === game.home_team)?.logo,
              awayLogo: teamData.eastern.find(t => t.name === game.away_team)?.logo || teamData.western.find(t => t.name === game.away_team)?.logo
            };
          }
          return null;
        }).filter(Boolean);

        setDraftKingsOdds(enrichedOdds);
      } catch (error) {
        console.error("Error fetching odds:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOdds();
  }, [teamData]); // Depend on teamData to re-run this effect when it changes

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='ContentGameOdds'>
      {draftKingsOdds.map((game, index) => (
        <Card
          key={index}
          homeTeam={game.homeTeam}
          awayTeam={game.awayTeam}
          odds={game.odds}
          data={game.additionalData}
          homeLogo={game.homeLogo}
          awayLogo={game.awayLogo}
        />
      ))}
    </div>
  );
};

export default NBAGameOdds;
