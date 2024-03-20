import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, StyledBody, StyledThumbnail, StyledTitle } from "baseui/card";
import "./TeamLeaderPlayerCard.scss"
import { useNavigate } from "react-router-dom";
import { Block } from "baseui/block";
import {
    LabelMedium,
    LabelXSmall,
    LabelLarge,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall
} from "baseui/typography";
import { Heading, HeadingLevel } from 'baseui/heading';

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;
const VITE_X_RAPIDAPI_URL2 = import.meta.env.VITE_X_RAPIDAPI_URL2;
const VITE_PLAYER_IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;

const TeamPlayerLeaderCard = ({ teamId, season, isSearchVisible, setIsSearchVisible, sendDataToParent }) => {
    const navigate = useNavigate();
    const [leaders, setLeaders] = useState([]);
    const [playerImages, setPlayerImages] = useState([])
    const [personalData, setPersonalData] = useState([]);
    console.log(leaders)

    useEffect(() => {
        const fetchPlayerStats = async () => {
            try {
                const response = await axios.request({
                    method: 'GET',
                    url: VITE_X_RAPIDAPI_URL2,
                    params: {
                        team: teamId,
                        season: season
                    },
                    headers: {
                        'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY,
                        'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST
                    }
                });
                setPersonalData(response.data.response.filter(e => {
                    return (leaders.map(e => e.id).includes(Number(e.id)))
                }));
            } catch (error) {
                console.error(error);
            }
        };
        if (leaders.length > 0) {
            fetchPlayerStats();
        }
    }, [teamId, season, leaders]);
    console.log("PERSONAL DATA", personalData)

    useEffect(() => {
        const fetchTeamLeaders = async () => {
            const options = {
                method: 'GET',
                url: VITE_X_RAPIDAPI_URL3,
                params: { team: teamId, season },
                headers: {
                    'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST,
                },
            };

            try {
                const response = await axios.request(options);
                sendDataToParent(response.data.response[0])
                if (response.data && response.data.response) {
                    const playerStats = response.data.response.reduce((acc, curr) => {
                        const playerId = curr.player.id;
                        if (!acc[playerId]) {
                            acc[playerId] = { ...curr.player, points: 0, assists: 0, rebounds: 0 };
                        }
                        acc[playerId].points += curr.points;
                        acc[playerId].assists += curr.assists;
                        acc[playerId].rebounds += curr.totReb;
                        return acc;
                    }, {});
                    console.log(leaders)
                    // Sort and find leaders
                    const sortedPoints = Object.values(playerStats).sort((a, b) => b.points - a.points);
                    const sortedAssists = Object.values(playerStats).sort((a, b) => b.assists - a.assists);
                    const sortedRebounds = Object.values(playerStats).sort((a, b) => b.rebounds - a.rebounds);

                    // Include category and construct image URL
                    const leadersWithCategory = [
                        { ...sortedPoints[0], category: 'Points Leader' },
                        { ...sortedAssists[0], category: 'Assists Leader' },
                        { ...sortedRebounds[0], category: 'Rebounds Leader' }
                    ].map(leader => ({ ...leader }));
                    setLeaders(leadersWithCategory);
                }
            } catch (error) {
                console.error('Failed to fetch team leaders:', error);
            }
        };
        fetchTeamLeaders();
    }, [teamId, season]);

    useEffect(() => {
        const fetchData = async () => {
            const images = await Promise.all(leaders.map(async (leader) => {
                const player = `${leader.firstname.toLowerCase()} ${leader.lastname.toLowerCase()}`;
                try {
                    const response = await fetch(`${VITE_PLAYER_IMAGE_BASE_URL}/playerimages/${player}`);
                    const data = await response.json();
                    return data.image_url;
                } catch (error) {
                    console.error('Failed to fetch player image:', error);
                    return 'https://via.placeholder.com/150';
                }
            }));
            setPlayerImages(images);
        };

        if (leaders.length > 0) {
            fetchData();
        }
    }, [leaders, VITE_PLAYER_IMAGE_BASE_URL]);

    return (
        <div className="teamleaderdisplaycards">
            {leaders.map((leader, index) => (
                <div
                    key={index}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setIsSearchVisible(false)
                        navigate(`/player/${leader.id}`, { state: { ...leader } })
                    }}
                >
                    <Card
                        overrides={{ Root: { style: { width: "328px", marginBottom: "20px", height: "185px", } } }}
                    >
                        <StyledTitle>
                            {leader.firstname} {leader.lastname} &nbsp;&nbsp;
                            {personalData[index] ? "#" + personalData[index].leagues.standard.jersey : ""}
                        </StyledTitle>
                        <StyledThumbnail src={playerImages[index] || 'https://via.placeholder.com/150'} />
                        <StyledBody>
                            <HeadingLevel >
                                <Heading marginTop="-16px" marginBottom="-1px" styleLevel={6}>
                                    {leader.category.split(" ")[0] === "Points" && `Points: ${leader.points}`}
                                    {leader.category.split(" ")[0] === "Assists" && `Assists: ${leader.assists}`}
                                    {leader.category.split(" ")[0] === "Rebounds" && `Rebounds: ${leader.rebounds}`}
                                </Heading>
                            </HeadingLevel>
                            {leader.category.split(" ")[0] === "Points" ?
                                <LabelXSmall>Assists: {leader.assists} &nbsp;&nbsp;&nbsp;&nbsp; Rebounds: {leader.rebounds}</LabelXSmall> : leader.category.split(" ")[0] === "Assists" ?
                                    <LabelXSmall>Points: {leader.points} &nbsp;&nbsp;&nbsp;&nbsp; Rebounds: {leader.rebounds}</LabelXSmall> : leader.category.split(" ")[0] === "Rebounds" ?
                                        <LabelXSmall>Points: {leader.points} &nbsp;&nbsp;&nbsp;&nbsp; Assists: {leader.assists} </LabelXSmall> : "n/a"}
                            <LabelXSmall>Affiliation: {personalData[index] ? personalData[index].affiliation : ""}  </LabelXSmall>
                            <LabelXSmall>DOB: {personalData[index] ? personalData[index].birth.date + ", " + personalData[index].birth.country : ""}  </LabelXSmall>
                            <LabelXSmall>
                                Height: {personalData[index] ? personalData[index].height.feets + "'" + personalData[index].height.inches + "\"" : ""} &nbsp;&nbsp;&nbsp;&nbsp;
                                Weight: {personalData[index] ? personalData[index].weight.pounds + "lbs" : ""}
                            </LabelXSmall>
                            <LabelXSmall>
                                Pro Start: {personalData[index] ? personalData[index].nba.start : ""}  &nbsp;&nbsp;&nbsp;&nbsp;
                                Years: {personalData[index] ? personalData[index].nba.pro : ""}
                            </LabelXSmall>

                        </StyledBody>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default TeamPlayerLeaderCard;
