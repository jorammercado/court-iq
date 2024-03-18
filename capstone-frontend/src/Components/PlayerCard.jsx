import React, { useEffect, useState } from "react";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PlayerCard = ({ player }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [playerImage, setPlayerImage] = useState("https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png"); // Fallback image URL

    useEffect(() => {
        // Construct the player name string as required by your API or image source
        const playerName = `${player.player.firstname.toLowerCase()}` + ` ${player.player.lastname.toLowerCase()}`
        // Replace VITE_BASE_URL with your actual base URL environment variable
        const imageUrl = `${import.meta.env.VITE_BASE_URL}/playerimages/${playerName}`;
        fetch(imageUrl)
            .then((response) => response.json())
            .then((data) => {
                    
                    setPlayerImage(data.image_url);
                
            })
            .catch(() => {
                console.error("Failed to fetch player image");
                // navigate("/not-found") // Uncomment if you want to navigate to a not-found page on error
            });
    }, [player.player.firstname, player.player.lastname, navigate]);

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
                src={playerImage} // Use state for the image URL
            />
            <StyledBody>
                {`Team: ${player.team.name}`} {/* Adjust according to your data structure */}
            </StyledBody>
            <StyledAction>
                <Button overrides={{ BaseButton: { style: { width: "100%" } } }} onClick={handleButtonClick}>
                    View Player Details
                </Button>
            </StyledAction>
        </Card>
    );
};

export default PlayerCard;
