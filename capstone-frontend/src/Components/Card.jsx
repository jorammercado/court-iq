import * as React from "react";
import { Card as BaseCard, StyledBody, StyledAction } from "baseui/card";
import Block from "baseui/block"
import { Button } from "baseui/button";

const Card = ({ title, odds }) => {
  return (
    <div  style= {{ display:'flex',flexDirection:'column' ,width: "328px", margin: "10px" }} >
    <BaseCard
      overrides={{ Root: { style: { display:'flex',flexDirection:'row' ,width: "328px", margin: "10px" } } }}
      title={title}
    >
      <StyledBody>
        {odds.slice(0,odds.length/3).map((outcome, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            {outcome.team}: {outcome.price}
          </div>
        ))}
      </StyledBody>
      
    </BaseCard>
    <BaseCard
      overrides={{ Root: { style: { display:'flex',flexDirection:'row' ,width: "328px", margin: "10px" } } }}
      title={title}
    >
      <StyledBody>
        {odds.slice(odds.length/3,2*odds.length/3).map((outcome, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            {outcome.team}: {outcome.price}
          </div>
        ))}
      </StyledBody>
      
    </BaseCard>
    <BaseCard
      overrides={{ Root: { style: { display:'flex',flexDirection:'row' ,width: "328px", margin: "10px" } } }}
      title={title}
    >
      <StyledBody>
        {odds.slice(2*odds.length/3,odds.length).map((outcome, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            {outcome.team}: {outcome.price}
          </div>
        ))}
      </StyledBody>
      
    </BaseCard>
    </div>
  );
};

export default Card;
