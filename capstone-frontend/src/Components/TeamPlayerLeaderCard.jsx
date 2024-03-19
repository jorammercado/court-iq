import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, StyledBody, StyledThumbnail, StyledTitle } from "baseui/card";
import "./TeamLeaderPlayerCard.scss"

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;
const VITE_PLAYER_IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL; // Assuming this is correct

const TeamPlayerLeaderCard = ({ teamId, season }) => {
    const [leaders, setLeaders] = useState([]);
    const [playerImages, setPlayerImages] = useState([])

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
                <Card
                    key={index}
                    overrides={{ Root: { style: { width: "328px", marginBottom: "20px" } } }}
                >
                    <StyledTitle>{leader.category}</StyledTitle>
                    <StyledThumbnail src={playerImages[index] || 'https://via.placeholder.com/150'} />
                    <StyledBody>
                        {`${leader.firstname} ${leader.lastname}`}<br />
                        Points: {leader.points}, Assists: {leader.assists}, Rebounds: {leader.rebounds}
                    </StyledBody>
                </Card>
            ))}
        </div>
    );
};

export default TeamPlayerLeaderCard;
