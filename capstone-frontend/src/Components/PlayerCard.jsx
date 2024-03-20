import React, { useEffect, useState } from "react";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom"; 
import { Block } from "baseui/block";

const PlayerCard = ({ player, personalData }) => {
    const navigate = useNavigate(); 
    const [playerImage, setPlayerImage] = useState("https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png");

    useEffect(() => {
       
        const playerName = `${player.player.firstname.toLowerCase()}` + ` ${player.player.lastname.toLowerCase()}`
       
        const imageUrl = `${import.meta.env.VITE_BASE_URL}/playerimages/${playerName}`;
        fetch(imageUrl)
            .then((response) => response.json())
            .then((data) => {

                setPlayerImage(data.image_url);

            })
            .catch(() => {
                console.error("Failed to fetch player image");
          
            });
    }, [player.player.firstname, player.player.lastname, navigate]);


    return (
        <Card
            overrides={{
                Root: {
                    style: {
                        width: "210px",
                        height: "175px",
                        marginBottom: "20px",
                        backgroundColor: "#EA6607",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }
                },
                Title: {
                    style: {
                        fontSize: '16px',
                        textAlign: 'center',
                        marginTop: "-10px",
                        marginBottom: "18px",
                        lineHeight: "1.1"
                    },
                }
            }}
            title={`${player.player.firstname} ${player.player.lastname} ${personalData ? !personalData.leagues.standard.jersey?"":"#" + personalData.leagues.standard.jersey : ""}
            ${personalData ?  personalData.leagues.standard.pos : ""}`}
        >
            <Block marginBottom="15px" marginTop="-15px">
                <StyledThumbnail
                    src={playerImage}
                    style={{ width: '68px', height: '68px', alignSelf: "center" }}
                />
                <StyledBody style={{ fontSize: "12px", lineHeight: "1.1" }}>
                {personalData && personalData.birth ? "DOB: " + personalData.birth.date+", "+personalData.birth.country : ""} <br></br>
                {personalData ? "College: " + personalData.college : ""} <br></br>
                {personalData ? "Height: " + personalData.height.feets+"'"+personalData.height.inches+"\"" : ""} <br></br>
                {personalData ? "Weight: " + personalData.weight.pounds+" lbs" : ""} <br></br>
                {personalData ? "Pro Start: " + personalData.nba.start : ""}<br></br>
                {personalData ? "Pro Years: " + personalData.nba.pro : ""}<br></br>

                </StyledBody>
            </Block>
        </Card>
    );
};

export default PlayerCard;
