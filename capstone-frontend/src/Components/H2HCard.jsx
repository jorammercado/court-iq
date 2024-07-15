import * as React from "react";
import { useEffect, useState } from 'react';
import { Card as BaseCard, StyledBody } from "baseui/card";
import "./H2HCard.scss"
const draftFamily = 'draftkings'
const fanDuelFamily = 'fanduel'
const betmgmFamily = 'caesars'
const bovadaFamily = 'bovada'
const drafKingsColors = ["#9AC434", "#F46C22", "#D8D8D8", "#000000 "]
const fanDuelColors = ["#1381E0", "#818E95", "#1F375B", "#0E67B3"]
const betmgmColors = ["#bda871"]
const bovadaColors = ["#cc0000"]

const Card = ({ homeTeam, awayTeam, odds, data, homeLogo, awayLogo, bookmaker, sport }) => {
  // console.log("DATA ", data)

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const primaryColors = ["#C8102E", "#007A33", "#000000", "#1D1160", "#CE1141", "#860038", "#00538C", "#0E2240", "#C8102E", "#1D428A", "#CE1141", "#002D62", "#C8102E", "#552583", "#5D76A9", "#98002E", "#00471B", "#0C2340", "#0C2340", "#006BB6", "#007AC1", "#0077C0", "#006BB6", "#1D1160", "#E03A3E", "#5A2D81", "#C4CED4", "#CE1141", "#002B5C", "#002B5C"];
  const teams = ['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards'];

  const primaryColorsWNBA = ["#C8102E", "#418FDE", "#A6192E", "#0C2340", "#C8102E",
    "#BA0C2F", "#FFC72C", "#0C2340", "#6ECEB2", "#201747",
    "#FBE122", "#0C2340"];
  const teamsWNBA = ['Atlanta Dream',
    'Chicago Sky',
    'Connecticut Sun',
    'Dallas Wings',
    'Indiana Fever',
    'Las Vegas Aces',
    'Los Angeles Sparks',
    'Minnesota Lynx',
    'New York Liberty',
    'Phoenix Mercury',
    'Seattle Storm',
    'Washington Mystics'];

  const findBackgroundColor = (team1, team2) => {
    const index1 = sport === "NBA" ? teams.indexOf(team1) : teamsWNBA.indexOf(team1);
    const index2 = sport === "NBA" ? teams.indexOf(team2) : teamsWNBA.indexOf(team2);
    const color1 = index1 !== -1 ? sport === "NBA" ? primaryColors[index1] : primaryColorsWNBA[index1] : "black";
    const color2 = index2 !== -1 ? sport === "NBA" ? primaryColors[index2] : primaryColorsWNBA[index2] : "black";
    return `linear-gradient(to right, ${color1}, ${color2})`;
  };

  const formatDate = (dateString) => {
    const utcDate = new Date(dateString);
    const estDate = new Date(utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000));

    // Determine if the date is in DST
    const isDst = (date) => {
      const marSecondSunday = new Date(date.getFullYear(), 2, 14 - (new Date(date.getFullYear(), 2, 1).getDay()));
      const novFirstSunday = new Date(date.getFullYear(), 10, 7 - (new Date(date.getFullYear(), 10, 1).getDay()));
      return date >= marSecondSunday && date < novFirstSunday;
    };

    // Adjust for Eastern Time Zone (5 hours behind UTC; 4 hours during DST)
    estDate.setHours(estDate.getHours() - (isDst(estDate) ? 4 : 5));

    const formatter = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return hours + ':' + minutes + ' ' + ampm;
    };

    return `${formatter(estDate)} EST`;
  };

  const textStyle = {
    fontSize: screenWidth <= 1080 && screenWidth > 1015 ? "14px" : screenWidth > 915 ? "14px" : screenWidth > 715 ? "13px" : "11px",
    fontWeight: "700",
    color: sport === "NBA" ? "white" : "white",
    margin: "5px 0",
    textAlign: "center",
    textShadow: "0 0 18px Black",
    lineHeight: screenWidth > 1015 ? "20px" : screenWidth > 915 ? "13px" : screenWidth >= 815 ? "11px" : "11px"
  };

  const imageStyle = {
    borderRadius: "8px",
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    boxShadow: '0px 0px 2px 2px orange' // Adding a soft white glow
  };



  const gameDateTime = data ? formatDate(data) : 'Time Not Available';
  return (
    <div className="h2hcard" style={{ display: 'flex', flexDirection: 'row', margin: screenWidth > 425 ? "10px" : "5px", border: 'solid #EA6607 3px', textAlign: 'center', borderRadius: "8px" }}>
      <BaseCard
        overrides={{
          Root: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              width: screenWidth > 1305 ? "389px" :
                screenWidth >= 1290 ? "520px" :
                  screenWidth >= 1240 ? "510px" :
                    screenWidth >= 1230 ? "500px" :
                      screenWidth >= 1080 ? "490px" :
                        screenWidth >= 915 ? "440px" :
                          "398px",
              height: screenWidth > 1015 ? "180px" : screenWidth > 825 ? "170px" : screenWidth > 755 ? "180px" : screenWidth > 715 && screenWidth <= 755 ? "255px" : screenWidth > 605 ? "210px" : screenWidth > 565 ? "280px" : screenWidth > 485 ? "210px" : screenWidth > 460 ? "185px" : screenWidth <= 315 ? "220px" : "215px",
              borderRadius: "5px",
              justifyContent: 'center',
              alignItems: 'center',
              background: findBackgroundColor(homeTeam, awayTeam),
              backgroundImage: `url('https://media.istockphoto.com/id/1146496553/photo/hardwood-maple-basketball-court-floor-viewed-from-above.jpg?s=612x612&w=0&k=20&c=Co17Ntpv-uPWgsVor66kcQc5SfL-fOK5AiL0bgpBhII='), ${findBackgroundColor(homeTeam, awayTeam)}`,
              backgroundSize: 'cover',
              backgroundBlendMode: 'overlay'
            }
          }
        }}
      >
        <StyledBody style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <img src={homeLogo} alt={homeTeam} style={{
            ...(homeTeam === "no games at this time" ? { marginRight: "8px" } : {}),
            ...(screenWidth <= 1305 && screenWidth > 715 ? { marginRight: "25px" } : screenWidth <= 530 ? { marginLeft: "-14px" } : screenWidth <= 565 ? { marginLeft: "-10px" } : {}),
            ...imageStyle,
            ...(screenWidth <= 315 ? { height: "20px" } : screenWidth <= 344 ? { height: "25px" } : screenWidth <= 375 ? { height: "30px" } : screenWidth <= 400 ? { height: "35px" } : screenWidth <= 565 ? { height: "40px" } : screenWidth <= 755 ? { height: "70px" } : screenWidth <= 815 ? { height: "60px" } : screenWidth <= 1015 ? { height: "55px" } : {}),
            ...(screenWidth <= 315 ? { width: "20px" } : screenWidth <= 344 ? { width: "25px" } : screenWidth <= 375 ? { width: "30px" } : screenWidth <= 400 ? { width: "35px" } : screenWidth <= 565 ? { width: "40px" } : screenWidth <= 755 ? { width: "70px" } : screenWidth <= 815 ? { width: "60px" } : screenWidth <= 1015 ? { width: "55px" } : {})
          }} />
          <div style={{ flex: '1' }}>
            <div style={{ ...textStyle, fontSize: screenWidth <= 1080 && screenWidth >= 915 ? "17px" : screenWidth > 1015 ? "18px" : screenWidth > 815 ? "15px" : screenWidth > 605 ? "14px" : "13px" }}>{"@" + homeTeam}</div>
            {
              homeTeam !== "no games at this time" &&
              (<>
                <div style={textStyle}>{"Game Time: " +
                  data ? new Date(data).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0] + `, ${gameDateTime}` : ""
                }</div>
                {odds.map((outcome, index) => (
                  <div key={index} style={textStyle}>
                    {outcome.team}: {outcome.price}
                  </div>
                ))}

                <span style={{ lineHeight: "0px", color: sport === "NBA" ? "white" : "white", ...(screenWidth <= 825 ? { fontSize: "12px" } : screenWidth <= 1015 ? { fontSize: "14px" } : {}) }}>Bookmaker:</span> &nbsp; <span style={{
                  color: sport === "NBA" ? "white" : "white",
                  lineHeight: "0px",
                  fontFamily: bookmaker === "DraftKings" ? draftFamily : bookmaker === "FanDuel" ? fanDuelFamily : bookmaker === "Bovada" ? bovadaFamily : bookmaker === "BetMGM" ? betmgmFamily : "inherit",
                  fontSize: screenWidth <= 460 ? "9px" : screenWidth <= 485 ? "9px" : screenWidth <= 825 ? "13px" : bookmaker === "DraftKings" ? "11px" : bookmaker === "FanDuel" ? "17px" : bookmaker === "Bovada" ? "17px" : bookmaker === "BetMGM" ? "17px" : "inherit",
                  borderRadius: bookmaker === "FanDuel" ? "1px" : bookmaker === "Bovada" ? "1px" : bookmaker === "BetMGM" ? "1px" : "inherit",
                  textDecoration: bookmaker === "DraftKings" ? "underline" : bookmaker === "FanDuel" ? "underline" : bookmaker === "Bovada" ? "underline" : bookmaker === "BetMGM" ? "underline" : "inherit",
                  textDecorationColor: bookmaker === "DraftKings" ? drafKingsColors[0] : bookmaker === "FanDuel" ? fanDuelColors[0] : bookmaker === "Bovada" ? bovadaColors[0] : bookmaker === "BetMGM" ? betmgmColors[0] : "inherit",
                  textDecorationThickness: bookmaker === "DraftKings" || bookmaker === "FanDuel" || bookmaker === "Bovada" || bookmaker === "BetMGM" ? "3px" : "inherit"
                }} >
                  {bookmaker === "DraftKings" ? "Draft Kings" : bookmaker === "FanDuel" ? "FanDuel" : bookmaker === "Bovada" ? "Bovada" : bookmaker === "BetMGM" ? "BetMGM" : "unknown"}
                </span>
              </>)
            }
          </div>
          <img src={awayLogo} alt={awayTeam} style={{
            ...(homeTeam === "no games at this time" ? { marginLeft: "8px" } : {}),
            ...(screenWidth <= 1305 && screenWidth > 715 ? { marginLeft: "25px" } : screenWidth <= 530 ? { marginRight: "-14px" } : screenWidth <= 565 ? { marginRight: "-10px" } : {}),
            ...imageStyle,
            ...(screenWidth <= 315 ? { height: "20px" } : screenWidth <= 344 ? { height: "25px" } : screenWidth <= 375 ? { height: "30px" } : screenWidth <= 400 ? { height: "35px" } : screenWidth <= 565 ? { height: "40px" } : screenWidth <= 755 ? { height: "70px" } : screenWidth <= 815 ? { height: "60px" } : screenWidth <= 1015 ? { height: "55px" } : {}),
            ...(screenWidth <= 315 ? { width: "20px" } : screenWidth <= 344 ? { width: "25px" } : screenWidth <= 375 ? { width: "30px" } : screenWidth <= 400 ? { width: "35px" } : screenWidth <= 565 ? { width: "40px" } : screenWidth <= 755 ? { width: "70px" } : screenWidth <= 815 ? { width: "60px" } : screenWidth <= 1015 ? { width: "55px" } : {})
          }} />
        </StyledBody>
      </BaseCard>
    </div>
  );
};

export default Card;