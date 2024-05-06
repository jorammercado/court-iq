import * as React from "react";
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

const Card = ({ homeTeam, awayTeam, odds, data, homeLogo, awayLogo, bookmaker }) => {
  // console.log("DATA ", data)

  const primaryColors = ["#C8102E", "#007A33", "#000000", "#1D1160", "#CE1141", "#860038", "#00538C", "#0E2240", "#C8102E", "#1D428A", "#CE1141", "#002D62", "#C8102E", "#552583", "#5D76A9", "#98002E", "#00471B", "#0C2340", "#0C2340", "#006BB6", "#007AC1", "#0077C0", "#006BB6", "#1D1160", "#E03A3E", "#5A2D81", "#C4CED4", "#CE1141", "#002B5C", "#002B5C"];
  const teams = ['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards'];


  const findBackgroundColor = (team1, team2) => {
    const index1 = teams.indexOf(team1);
    const index2 = teams.indexOf(team2);
    const color1 = index1 !== -1 ? primaryColors[index1] : "black";
    const color2 = index2 !== -1 ? primaryColors[index2] : "black";
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
    fontSize: "16px",
    fontWeight: "700",
    color: "white",
    margin: "5px 0", 
    textAlign: "center",
    textShadow: "0 0 18px Black",
    lineHeight: "20px"
  };

  const imageStyle = {
    borderRadius:"8px",
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    boxShadow: '0px 0px 2px 2px orange' // Adding a soft white glow
  };



  const gameDateTime = data ? formatDate(data) : 'Time Not Available';
  return (
    <div className="h2hcard" style={{ display: 'flex', flexDirection: 'row', margin: "10px", border: 'solid #EA6607 3px', textAlign: 'center', borderRadius:"8px" }}>
      <BaseCard
        overrides={{
          Root: {
            style: {
              display: 'flex',
              flexDirection: 'row',
              width: "398px",
              height: "180px",
              borderRadius: "8px",
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
          <img src={homeLogo} alt={homeTeam} style={imageStyle} />
          <div style={{ flex: '1' }}>
            <div style={{ ...textStyle, fontSize: "18px" }}>{"@" + homeTeam}</div>
            <div style={textStyle}>{"Game Time: " +
              data ? new Date(data).toLocaleString('en-US', { timeZone: 'America/New_York' }).split(",")[0] + `, ${gameDateTime}` : ""
            }</div>
            {odds.map((outcome, index) => (
              <div key={index} style={textStyle}>
                {outcome.team}: {outcome.price}
              </div>
            ))}
            Bookmaker: &nbsp; <span style={{
              // color: bookmaker === "DraftKings" ? drafKingsColors[0] : bookmaker === "FanDuel" ? fanDuelColors[0] : bookmaker === "Bovada" ? bovadaColors[0] : bookmaker === "BetMGM" ? betmgmColors[0] : "inherit",
              fontFamily: bookmaker === "DraftKings" ? draftFamily : bookmaker === "FanDuel" ? fanDuelFamily : bookmaker === "Bovada" ? bovadaFamily : bookmaker === "BetMGM" ? betmgmFamily : "inherit",
              fontSize: bookmaker === "DraftKings" ? "11px" : bookmaker === "FanDuel" ? "17px" : bookmaker === "Bovada" ? "17px" : bookmaker === "BetMGM" ? "17px" : "inherit",
              // backgroundColor: bookmaker === "FanDuel" ? "#202020" : bookmaker === "Bovada" ? "#202020" : bookmaker === "BetMGM" ? "#202020" : "inherit",
              borderRadius: bookmaker === "FanDuel" ? "1px" : bookmaker === "Bovada" ? "1px" : bookmaker === "BetMGM" ? "1px" : "inherit",
              textDecoration: bookmaker === "DraftKings" ? "underline" : bookmaker === "FanDuel" ? "underline" : bookmaker === "Bovada" ? "underline" : bookmaker === "BetMGM" ? "underline" : "inherit",
              textDecorationColor: bookmaker === "DraftKings" ? drafKingsColors[0] : bookmaker === "FanDuel" ? fanDuelColors[0] : bookmaker === "Bovada" ? bovadaColors[0] : bookmaker === "BetMGM" ? betmgmColors[0] : "inherit",
              textDecorationThickness: bookmaker === "DraftKings" || bookmaker === "FanDuel" || bookmaker === "Bovada" || bookmaker === "BetMGM" ? "3px" : "inherit"
            }} >
              {bookmaker === "DraftKings" ? "Draft Kings" : bookmaker === "FanDuel" ? "FanDuel" : bookmaker === "Bovada" ? "Bovada" : bookmaker === "BetMGM" ? "BetMGM" : "unknown"}
            </span>
          </div>
          <img src={awayLogo} alt={awayTeam} style={imageStyle} />
        </StyledBody>
      </BaseCard>
    </div>
  );
};

export default Card;