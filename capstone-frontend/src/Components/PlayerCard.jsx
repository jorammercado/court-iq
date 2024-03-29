import React, { useEffect, useState } from "react";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { Block } from "baseui/block";

const PlayerCard = ({ player, personalData, primaryColor, secondaryColor }) => {
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
                        width: "310px",
                        height: "175px",
                        marginBottom: "20px",
                        // backgroundColor: primaryColor,
                        backgroundColor: "#ED751C",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: "0",
                        border: "none",
                    }
                },
                Title: {
                    style: {
                        fontSize: '19px',
                        textAlign: 'center',
                        marginTop: "-10px",
                        marginBottom: "18px",
                        lineHeight: "1.1",
                        // color: secondaryColor
                        color:"black"
                    },
                }
            }}
            title={`${player.player.firstname} ${player.player.lastname} ${personalData && personalData.leagues && personalData.leagues.standard ? !personalData.leagues.standard ? "" : "#" + personalData.leagues.standard.jersey : ""}
            ${personalData && personalData.leagues && personalData.leagues.standard ? personalData.leagues.standard.pos : ""}`}
        >
            <Block marginBottom="15px" marginTop="-15px">
                <StyledThumbnail
                    src={playerImage}
                    style={{ width: '125px', height: '125px', alignSelf: "center", border:"none" }}
                />
                <StyledBody style={{ fontSize: "15px", fontWeight: "600", lineHeight: "1.1", marginTop: "23px", color:"black", marginLeft:"4px" }}>
                    {personalData && personalData.birth ? "DOB: " + personalData.birth.date + ", " + personalData.birth.country : ""} <br></br>
                    {personalData ? "College: " + personalData.college : ""} <br></br>
                    {personalData&&personalData.height ? "Height: " + personalData.height.feets + "'" + personalData.height.inches + "\"" : ""} <br></br>
                    {personalData&&personalData.weight ? "Weight: " + personalData.weight.pounds + " lbs" : ""} <br></br>
                    {personalData&&personalData.nba ? "Pro Start: " + personalData.nba.start : ""}<br></br>
                    {personalData&&personalData.nba ? "Pro Years: " + personalData.nba.pro : ""}<br></br>

                </StyledBody>
            </Block>
        </Card>
    );
};

export default PlayerCard;
