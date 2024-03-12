import * as React from "react";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Button } from "baseui/button";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PlayerCard = ({ player }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle button click
    const handleButtonClick = () => {
        navigate(`/player/${player.player.id}`, { state: { ...player.player } });
    };

    return (
        <Card
            overrides={{ Root: { style: { width: "328px", marginBottom: "20px", backgroundColor: "#EA6607" } } }}
            title={`${player.player.firstname} ${player.player.lastname}`}
        >
            <StyledThumbnail
                src={player.team.logo} // Adjust as needed
            />
            <StyledBody>
                {`Team: ${player.team.name}`} {/* Adjust according to your data structure */}
            </StyledBody>
            <StyledAction>
                {/* Updated Button to use onClick for navigation */}
                <Button overrides={{ BaseButton: { style: { width: "100%" } } }} onClick={handleButtonClick}>
                    View Player Details
                </Button>
            </StyledAction>
        </Card>
    );
};

export default PlayerCard;
