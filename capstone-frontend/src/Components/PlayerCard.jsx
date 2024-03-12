import * as React from "react";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Button } from "baseui/button";
import { Link } from 'react-router-dom';

const PlayerCard = ({ player }) => {
    return (
      <Card
        overrides={{ Root: { style: { width: "328px", marginBottom: "20px" } } }}
        title={`${player.player.firstname} ${player.player.lastname}`}
      >
        <StyledThumbnail
          src={player.team.logo} // Assuming 'thumbnail' is the correct key; adjust as needed
        />
        <StyledBody>
          {`Team: ${player.team.name}`} {/* Adjust according to your data structure */}
        </StyledBody>
        <StyledAction>
          <Link to={`/player/${player.player.id}`} style={{ textDecoration: 'none' }}>
            <Button overrides={{ BaseButton: { style: { width: "100%" } } }}>
              View Details
            </Button>
          </Link>
        </StyledAction>
      </Card>
    );
  };

export default PlayerCard;
