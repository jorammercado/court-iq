import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'; // Import the Card component
import "./GameOdds.scss";

const NBAGameOdds = ({ teamData }) => {
  const [draftKingsOdds, setDraftKingsOdds] = useState([]);
  const [fanduelOdds, setFanduelOdds] = useState([]);
  const [betMGMOdds, setBetMGMOdds] = useState([]);
  const [bovadaOdds, setBovadaOdds] = useState([]);
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

        const enrichedOdds2 = response.data.map(game => {
          const bookmaker2 = game.bookmakers.find(b => b.key === 'fanduel');
          const market2 = bookmaker2?.markets.find(m => m.key === 'h2h');
          if (market2) {
            return {
              homeTeam: game.home_team,
              awayTeam: game.away_team,
              odds: market2.outcomes.map(outcome => ({
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

        const enrichedOdds3 = response.data.map(game => {
          const bookmaker3 = game.bookmakers.find(b => b.key === 'betmgm');
          const market3 = bookmaker3?.markets.find(m => m.key === 'h2h');
          if (market3) {
            return {
              homeTeam: game.home_team,
              awayTeam: game.away_team,
              odds: market3.outcomes.map(outcome => ({
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

        const enrichedOdds4 = response.data.map(game => {
          const bookmaker4 = game.bookmakers.find(b => b.key === 'bovada');
          const market4 = bookmaker4?.markets.find(m => m.key === 'h2h');
          if (market4) {
            return {
              homeTeam: game.home_team,
              awayTeam: game.away_team,
              odds: market4.outcomes.map(outcome => ({
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
        setFanduelOdds(enrichedOdds2);
        setBetMGMOdds(enrichedOdds3);
        setBovadaOdds(enrichedOdds4);
      } catch (error) {
        console.error("Error fetching odds:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOdds();
  //  saveOddsDataLocally(draftKingsOdds, fanduelOdds, betMGMOdds, bovadaOdds);
  }, [teamData]); 

  // save data for demo day
  const saveOddsDataLocally = (draftKingsOdds, fanduelOdds, betMGMOdds, bovadaOdds) => {
    const dataToSave = {
      draftKingsOdds,
      fanduelOdds,
      betMGMOdds,
      bovadaOdds
    };

    const jsonData = JSON.stringify(dataToSave);
    const fileName = 'oddsData.json';
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='ContentGameOdds'>
      {draftKingsOdds && draftKingsOdds.length > 0 ? draftKingsOdds.map((game, index) => (
        <Card
          key={index}
          homeTeam={game.homeTeam}
          awayTeam={game.awayTeam}
          odds={game.odds}
          data={game.additionalData}
          homeLogo={game.homeLogo}
          awayLogo={game.awayLogo}
          bookmaker="DraftKings"
        />
      )) : <></>}
      {fanduelOdds && fanduelOdds.length > 0 ? fanduelOdds.map((game, index) => (
        <Card
          key={index}
          homeTeam={game.homeTeam}
          awayTeam={game.awayTeam}
          odds={game.odds}
          data={game.additionalData}
          homeLogo={game.homeLogo}
          awayLogo={game.awayLogo}
          bookmaker="FanDuel"
        />
      )) : <></>}
      {betMGMOdds && betMGMOdds.length > 0 ? betMGMOdds.map((game, index) => (
        <Card
          key={index}
          homeTeam={game.homeTeam}
          awayTeam={game.awayTeam}
          odds={game.odds}
          data={game.additionalData}
          homeLogo={game.homeLogo}
          awayLogo={game.awayLogo}
          bookmaker="BetMGM"
        />
      )) : <></>}
      {bovadaOdds && bovadaOdds.length > 0 ? bovadaOdds.map((game, index) => (
        <Card
          key={index}
          homeTeam={game.homeTeam}
          awayTeam={game.awayTeam}
          odds={game.odds}
          data={game.additionalData}
          homeLogo={game.homeLogo}
          awayLogo={game.awayLogo}
          bookmaker="Bovada"
        />
      )) : <></>}
    </div>
  );
};

export default NBAGameOdds;
