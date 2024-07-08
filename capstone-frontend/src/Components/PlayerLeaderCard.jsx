
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, StyledBody, StyledThumbnail, StyledTitle } from "baseui/card";
import "./PlayerLeaderCard.scss"
import { useNavigate } from "react-router-dom";
import { Block } from "baseui/block";
import { Heading, HeadingLevel } from 'baseui/heading';
import Spin from './SpinLoad';

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;
const VITE_X_RAPIDAPI_URL2 = import.meta.env.VITE_X_RAPIDAPI_URL2;
const VITE_PLAYER_IMAGE_BASE_URL = import.meta.env.VITE_BASE_URL;

const TeamPlayerLeaderCard = ({ teamId,
    season,
    sendDataToParent,
    games5,
    games10,
    games20,
    games50,
    gamesAll,
    primaryColor
}) => {
    const navigate = useNavigate();
    const [leaders, setLeaders] = useState([]);
    const [playerImages, setPlayerImages] = useState([])
    const [personalData, setPersonalData] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                            acc[playerId] = { ...curr.player, points: 0, assists: 0, rebounds: 0, games: 0 };
                        }
                        acc[playerId].points += curr.points;
                        acc[playerId].assists += curr.assists;
                        acc[playerId].rebounds += curr.totReb;
                        acc[playerId].games++;
                        return acc;
                    }, {});

                    // Sort and find leaders
                    const sortedPoints = Object.values(playerStats).sort((a, b) => b.points - a.points)
                    const sortedAssists = Object.values(playerStats).sort((a, b) => b.assists - a.assists);
                    const sortedRebounds = Object.values(playerStats).sort((a, b) => b.rebounds - a.rebounds);
                    const calculateAverage = (stat, games) => games > 0 ? (stat / games).toFixed(2) : 0; // Ensure division by zero is handled

                    // Include category and construct image URL
                    const leadersWithCategory = [
                        { ...sortedPoints[0], category: 'Points', average: calculateAverage(sortedPoints[0].points, sortedPoints[0].games) },
                        { ...sortedAssists[0], category: 'Assists', average: calculateAverage(sortedAssists[0].assists, sortedAssists[0].games) },
                        { ...sortedRebounds[0], category: 'Rebounds', average: calculateAverage(sortedRebounds[0].rebounds, sortedRebounds[0].games) }
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
        <div >
            {personalData.length > 0 ?
                <div className="teamleaderdisplaycards1">
                    {leaders.map((leader, index) => (
                        <div
                            key={index}
                            style={{ cursor: 'pointer', alignItems: "flex-start" }}
                            onClick={() => {
                                leader = { ...leader, games5, games10, games20, games50, gamesAll }
                                navigate(`/player/${leader.id}`, { state: { ...leader } })
                            }}
                        >
                            <Card className="responsiveCard"
                                overrides={{
                                    Root: {
                                        style: {
                                            backgroundColor: primaryColor,
                                            border: "none",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width:
                                                screenWidth > 870 ? "275px" :
                                                    screenWidth > 750 ? "230px" :
                                                        screenWidth > 620 ? "190px" :
                                                            screenWidth > 494 ? "150px" :
                                                                screenWidth > 440 ? "140px" :
                                                                    screenWidth > 365 ? "115px" : "95px",
                                            marginTop: "0px",
                                            marginBottom: "20px",
                                            height:
                                                screenWidth > 870 ? "360px" :
                                                    screenWidth > 750 ? "340px" :
                                                        screenWidth > 620 ? "320px" :
                                                            screenWidth > 494 ? "300px" :
                                                                screenWidth > 440 ? "225px" :
                                                                    screenWidth > 365 ? "210px" : "200px",
                                            borderBottomRightRadius: "8px",
                                            borderBottomLeftRadius: "8px",
                                            borderTopRightRadius: leader.category === "Assists" ? "8px" : "8px",
                                            borderTopLeftRadius: leader.category === "Assists" ? "8px" : "8px",
                                            padding: '20px',
                                        }
                                    }
                                }}
                            >
                                <StyledTitle style={{
                                    fontSize: screenWidth > 870 ? '25px' : screenWidth > 750 ? '22px' : screenWidth > 620 ? '21px' : screenWidth > 494 ? '18px' : "15px",
                                    marginRight: '0', padding: '0', textAlign: "center", marginBottom: "20px", color: teamId === "31" ? "black" : "white",
                                }}>
                                    {`${leader.firstname} ${leader.lastname}`.length < 14 && screenWidth > 365 ? `${leader.firstname} ${leader.lastname}` : `${leader.lastname}`}
                                </StyledTitle>

                                <StyledThumbnail src={playerImages[index] || 'https://via.placeholder.com/150'}
                                    style={{
                                        height: screenWidth > 870 ? '190px' : screenWidth > 750 ? '180px' : screenWidth > 620 ? '170px' : screenWidth > 494 ? '160px' : screenWidth > 440 ? '130px' : screenWidth > 365 ? '105px' : "90px",
                                        width: screenWidth > 870 ? '260px' : screenWidth > 750 ? '220px' : screenWidth > 620 ? '180px' : screenWidth > 494 ? '130px' : screenWidth > 440 ? '110px' : screenWidth > 365 ? '100px' : '90px',
                                        alignSelf: "center",
                                        border: "none",
                                        marginBottom: screenWidth > 494 ? "20px" : "0px",
                                        marginTop: "-15px",
                                        marginRight: "5px"
                                    }}
                                />

                                <StyledBody>
                                    <HeadingLevel >
                                        <Heading style={{
                                            fontSize: screenWidth > 870 ? "25px" : screenWidth > 750 ? "22px" : screenWidth > 620 ? "21px" : screenWidth > 494 ? "18px" : "13.5px", textAlign: "center", marginBottom: "-20px", color: teamId === "31" ? "black" : "white"
                                        }} styleLevel={6}>
                                            {leader.category === "Points" ? "PPG" : leader.category === "Assists" ? "APG" : "RPG"}
                                            <br />
                                            <span style={{ fontSize: screenWidth > 870 ? "15px" : screenWidth > 494 ? "14px" : "13px" }}>{leader.average}</span>
                                        </Heading>
                                    </HeadingLevel>
                                </StyledBody>
                            </Card>

                        </div>
                    ))}
                </div>
                : <Block display="flex" flexDirection="column" alignItems="center" justifyContent="flex-end" width="1300px">
                    <Spin >
                    </Spin>
                </Block>}
        </div>
    );
};

export default TeamPlayerLeaderCard;