import React from "react";
import { Card, StyledBody } from "baseui/card";
import { Avatar } from "baseui/avatar";
import { useStyletron } from "baseui";

const TopScoringTeamCard = ({ logo, name, conference }) => {
  const [css] = useStyletron();
  return (
    <Card
      overrides={{
        Root: { style: { width: "auto", marginBottom: "20px" } },
        HeaderImage: { style: { width: "60px", height: "60px" } }, // Adjust size as needed
      }}
    
      title={`${conference} Conference Top Offensive Team`}
    >
      <StyledBody>
        <div className={css({ display: "flex", alignItems: "center", gap: "10px" })}>
          <Avatar name={name} size="scale1200" src={logo} />
          <span>{name}</span>
        </div>
      </StyledBody>
    </Card>
  );
};

export default TopScoringTeamCard;
