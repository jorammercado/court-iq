import * as React from "react";
import { Card as BaseCard, StyledBody, StyledAction } from "baseui/card";
import Block from "baseui/block"
import { Button } from "baseui/button";

const Card = ({ title, propName, propPoint, propPrice }) => {
    const primaryColors = ["#C8102E", "#007A33", "#000000", "#1D1160", "#CE1141", "#860038", "#00538C", "#0E2240", "#C8102E", "#1D428A", "#CE1141", "#002D62", "#C8102E", "#552583", "#5D76A9", "#98002E", "#00471B", "#0C2340", "#0C2340", "#006BB6", "#007AC1", "#0077C0", "#006BB6", "#1D1160", "#E03A3E", "#5A2D81", "#C4CED4", "#CE1141", "#002B5C", "#002B5C"]
    const secondaryColors = ["#FDB927", "#BA9653", "#FFFFFF", "#00788C", "#000000", "#FDBB30", "#B8C4CA", "#FEC524", "#BEC0C2", "#FFC72C", "#000000", "#FDBB30", "#1D428A", "#FDB927", "#12173F", "#F9A01B", "#EEE1C6", "#236192", "#C8102E", "#F58426", "#EF3B24", "#C4CED4", "#ED174C", "#E56020", "#000000", "#63727A", "#000000", "#000000", "#F9A01B", "#E31837"]
    const teams = ['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons',
        'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves',
        'New Orleans Pelicans', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings',
        'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards']
    return (
        <div style={{ display: 'flex', width: "228px", margin: "10px" }} >
            <BaseCard
                overrides={{
                    Root: {
                        style: {
                            display: 'flex', flexDirection: 'row', width: "228px", margin: "10px", height: "160px", borderRadius: "0px",
                            backgroundColor: "black"
                        }
                    },
                    Title: {
                        style: ({ $theme }) => ({
                            fontSize: "16px",
     
                            color: "white"
                        })
                    },
                }}
                title={title}
            >
                <StyledBody>
                    <div style={{ marginBottom: "8px", fontSize: "20px", color:"white", fontWeight: "700" }}>
                    <p>{propName}: {propPoint} @ {propPrice} </p>
                    </div>
                </StyledBody>
            </BaseCard>
        </div>
    );
};

export default Card;
