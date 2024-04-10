import * as React from "react";
import { Card as BaseCard, StyledBody, StyledAction } from "baseui/card";
import Block from "baseui/block"
import { Button } from "baseui/button";

const Card = ({ title, odds }) => {
  const primaryColors = ["#C8102E", "#007A33", "#000000", "#1D1160", "#CE1141", "#860038", "#00538C", "#0E2240", "#C8102E", "#1D428A", "#CE1141", "#002D62", "#C8102E", "#552583", "#5D76A9", "#98002E", "#00471B", "#0C2340", "#0C2340", "#006BB6", "#007AC1", "#0077C0", "#006BB6", "#1D1160", "#E03A3E", "#5A2D81", "#C4CED4", "#CE1141", "#002B5C", "#002B5C"]
  const secondaryColors = ["#FDB927", "#BA9653", "#FFFFFF", "#00788C", "#000000", "#FDBB30", "#B8C4CA", "#FEC524", "#BEC0C2", "#FFC72C", "#000000", "#FDBB30", "#1D428A", "#FDB927", "#12173F", "#F9A01B", "#EEE1C6", "#236192", "#C8102E", "#F58426", "#EF3B24", "#C4CED4", "#ED174C", "#E56020", "#000000", "#63727A", "#000000", "#000000", "#F9A01B", "#E31837"]
  const teams = ['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons',
    'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves',
    'New Orleans Pelicans', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings',
    'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards']

  const findBackgroundColor = () => {
    const teamIndex = teams.indexOf(title);
    if (teamIndex !== -1) {
      return primaryColors[teamIndex];
    }
    return "black";
  };

  const findColor = () => {
    const teamIndex = teams.indexOf(title);
    if (teamIndex !== -1) {
      return secondaryColors[teamIndex];
    }
    return "white";
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', margin: "10px" }} >


      <BaseCard
        overrides={{
          Root: {
            style: {
              display: 'flex', flexDirection: 'row', width: "278px", margin: "5px", height: "200px", borderRadius: "0px",
              backgroundColor: findBackgroundColor()
            }
          },
          Title: {
            style: ({ $theme }) => ({
              fontSize: "15px",
              fontWeight: "normal",
              color: findColor()
            })
          },
        }}
        title={"Home Team: " + title}
      >
        <StyledBody>
          {odds.slice(odds.length / 3, 2 * odds.length / 3).map((outcome, index) => (
            <div key={index} style={{ marginBottom: "8px", fontSize: "20px", color: title == "San Antonio Spurs" ? "black" : "white", fontWeight: "700" }}>
              {outcome.team}: {outcome.price}
            </div>
          ))}
        </StyledBody>

      </BaseCard>
      <BaseCard
        overrides={{
          Root: {
            style: {
              display: 'flex', flexDirection: 'row', width: "278px", margin: "5px", height: "200px", borderRadius: "0px",
              backgroundColor: findBackgroundColor()
            }
          },
          Title: {
            style: ({ $theme }) => ({
              fontSize: "15px",
              fontWeight: "normal",
              color: findColor()
            })
          }
        }}
        title={"Home Team: " + title}
      >
        <StyledBody>
          {odds.slice(2 * odds.length / 3, odds.length).map((outcome, index) => (
            <div key={index} style={{ marginBottom: "8px", fontSize: "20px", color: title == "San Antonio Spurs" ? "black" : "white", fontWeight: "700" }}>
              {outcome.team}: {outcome.price}
            </div>
          ))}
        </StyledBody>

      </BaseCard>
    </div>
  );
};

export default Card;
