// TopDefensiveTeamCard.jsx
import React from "react";
import { Card, StyledBody } from "baseui/card";
import { Avatar } from "baseui/avatar";
import { useStyletron } from "baseui";

const TopDefensiveTeamCard = ({ logo, name, conference }) => {
  const [css] = useStyletron();
  return (
    <Card
      overrides={{
        Root: { style: { width: "auto", marginBottom: "20px" } }
      }}
      title={`${conference} Conference Top Defensive Team`}
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

export default TopDefensiveTeamCard;
