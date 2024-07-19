import React, { useEffect, useState } from "react";
import { Table } from "baseui/table-semantic";
import Spin from "./SpinLoad";
import axios from "axios";
import MyGraph from "./MyChart";
import { useNavigate } from "react-router-dom"
import "./Player.scss"
import { Block } from "baseui/block";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Avatar } from "baseui/avatar";
import { Select } from 'baseui/select';
import {
    LabelLarge,
    LabelMedium,
    LabelSmall,
    HeadingMedium,
    HeadingSmall
} from "baseui/typography";
import { HistogramWithAxis } from "./HistogramWithAxis";
import { Spinner, SIZE } from "baseui/spinner";

const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;
const VITE_X_RAPIDAPI_URL2 = import.meta.env.VITE_X_RAPIDAPI_URL2;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function PlayerExample({ data, playerid }) {
    let navigate = useNavigate()
    const [playerImage, setPlayerImage] = useState({
        player_id: 0,
        player: "",
        birth_date: "",
        image_url: ""
    })
    useEffect(() => {
        const player = `${data.firstname.toLowerCase()}` + ` ${data.lastname.toLowerCase()}`
        fetch(`${VITE_BASE_URL}/playerimages/${player}`)
            .then(response => response.json())
            .then(playerImage => {
                setPlayerImage(playerImage)
            })
            .catch(() => navigate("/not-found"))
    }, [data, navigate])

    const [primaryColor, setPrimaryColor] = useState("#EA6607")
    const [secondaryColor, setSecondaryColor] = useState("#000000")
    const primaryColors = ["#C8102E", "#007A33", "#000000", "#1D1160", "#CE1141", "#860038", "#00538C", "#0E2240", "#C8102E", "#1D428A", "#CE1141", "#002D62", "#C8102E", "#552583", "#5D76A9", "#98002E", "#00471B", "#0C2340", "#0C2340", "#006BB6", "#007AC1", "#0077C0", "#006BB6", "#1D1160", "#E03A3E", "#5A2D81", "#C4CED4", "#CE1141", "#002B5C", "#002B5C"]
    const secondaryColors = ["#FDB927", "#BA9653", "#FFFFFF", "#00788C", "#000000", "#FDBB30", "#B8C4CA", "#FEC524", "#1D42BA", "#FFC72C", "#000000", "#FDBB30", "#1D428A", "#FDB927", "#12173F", "#F9A01B", "#EEE1C6", "#236192", "#C8102E", "#F58426", "#EF3B24", "#C4CED4", "#ED174C", "#E56020", "#000000", "#63727A", "#000000", "#000000", "#00471B", "#E31837"]
    const teams = ['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons',
        'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves',
        'New Orleans Pelicans', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings',
        'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards']

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [referenceData, setReferenceData] = useState({})
    const [playerStats, setPlayerStats] = useState([]);
    const [points, setPoints] = useState([]);
    const [assists, setAssists] = useState([]);
    const [rebounds, setRebounds] = useState([]);
    const [threePoints, setThreePoints] = useState([]);
    const [plusMinus, setPlusMinus] = useState([]);
    const [minutes, setMinutes] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [steals, setSteals] = useState([]);
    const [turnovers, setTurnovers] = useState([]);
    const [fgp, setFGP] = useState([]);
    const [tpp, setTPP] = useState([]);
    const [ftp, setFTP] = useState([]);
    const [dd, setDD] = useState("n/a");
    const [td, setTD] = useState("n/a");
    const [team, setTeam] = useState([])
    const [personalData, setPersonalData] = useState({});
    const [selectedSeason, setSelectedSeason] = useState("2023");
    const [fga, setFGA] = useState([])
    const [fta, setFTA] = useState([])
    const [last5Games, setLast5Games] = useState([])
    const [last10Games, setLast10Games] = useState([])
    const [last20Games, setLast20Games] = useState([])
    const [last50Games, setLast50Games] = useState([])
    const [lastAllGames, setLastAllGames] = useState([])
    const [last10GamesPlayerData, setLast10GamesPlayerData] = useState([])
    const [last20GamesPlayerData, setLast20GamesPlayerData] = useState([])
    const [last50GamesPlayerData, setLast50GamesPlayerData] = useState([])
    const [lastAllGamesPlayerData, setLastAllGamesPlayerData] = useState([])
    const [last5Ids, setLast5Ids] = useState([])
    const [last10Ids, setLast10Ids] = useState([])
    const [last20Ids, setLast20Ids] = useState([])
    const [last50Ids, setLast50Ids] = useState([])
    const [lastAllIds, setLastAllIds] = useState([])
    const [tpm, setTPM] = useState([]);
    const [gamesInView, setGamesInView] = useState(screenWidth > 901 ? '5' : 'season')

    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isHighlightedGames, setIsHighlightedGames] = useState(false);
    useEffect(() => {
        if (selectedSeason) {
            setIsHighlighted(true);
            const timer = setTimeout(() => {
                setIsHighlighted(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [selectedSeason]);
    useEffect(() => {
        if (gamesInView) {
            setIsHighlightedGames(true);
            const timer = setTimeout(() => {
                setIsHighlightedGames(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [gamesInView]);

    useEffect(() => {
        const fetchPlayerStats = async () => {
            try {
                const response = await axios.request({
                    method: 'GET',
                    url: VITE_X_RAPIDAPI_URL2,
                    params: {
                        team: team,
                        season: selectedSeason
                    },
                    headers: {
                        'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY2,
                        'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST2
                    }
                });
                setPersonalData(response.data.response.filter(e => Number(e.id) === Number(playerid))[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPlayerStats();
    }, [team, selectedSeason]);

    const setIds = (data, setFunc, count) => {
        setFunc(data.slice(-count).map(item => item.game.id));
    };

    const filterGames = (allGames, ids) => {
        return allGames.filter(game => ids.includes(game.id));
    };

    useEffect(() => {
        const fetchPlayerStats = async () => {
            const requestOptions = {
                method: "GET",
                url: VITE_X_RAPIDAPI_URL3,
                params: {
                    id: playerid,
                    season: selectedSeason,
                },
                headers: {
                    "X-RapidAPI-Key": `${VITE_X_RAPIDAPI_KEY2}`,
                    "X-RapidAPI-Host": `${VITE_X_RAPIDAPI_HOST2}`,
                },
            };

            try {
                const response = await axios(requestOptions);
                setPlayerStats(response.data.response);
                // console.log(response.data)
                setTeam(response.data.response[0].team.id)
                setReferenceData(response.data.response[0])
                setPoints(response.data.response.map((e) => e.points));
                setAssists(response.data.response.map((e) => e.assists));
                setRebounds(response.data.response.map((e) => e.defReb + e.offReb));
                setThreePoints(response.data.response.map((e) => e.tpm));
                setPlusMinus(response.data.response.map((e) => e.plusMinus));
                setMinutes(response.data.response.map((e) => e.min));
                setBlocks(response.data.response.map((e) => e.blocks));
                setFGA(response.data.response.map((e) => e.fga));
                setFTA(response.data.response.map((e) => e.fta));
                setSteals(response.data.response.map((e) => e.steals));
                setTurnovers(response.data.response.map((e) => e.turnovers));
                setFGP(response.data.response.map((e) => e.fgp));
                setTPP(response.data.response.map((e) => e.tpp));
                setFTP(response.data.response.map((e) => e.ftp));
                setIds(response.data.response, setLast5Ids, 5);
                setIds(response.data.response, setLast10Ids, 10);
                setIds(response.data.response, setLast20Ids, 20);
                setIds(response.data.response, setLast50Ids, 50);
                setIds(response.data.response, setLastAllIds, response.data.response.length);
                setLast10GamesPlayerData([...response.data.response].reverse().slice(0, 10));
                setLast20GamesPlayerData([...response.data.response].reverse().slice(0, 20));
                setLast50GamesPlayerData([...response.data.response].reverse().slice(0, 50));
                setLastAllGamesPlayerData([...response.data.response].reverse().slice(0));
                setTPM(response.data.response.map((e) => e.tpm));
            } catch (error) {
                console.error("Error fetching player statistics:", error);
            }
        };
        fetchPlayerStats();
    }, [playerid, selectedSeason]);

    useEffect(() => {
        const fetchGames = async () => {
            let allGamesData = [];
            let newLast5Games = [];
            let newLast10Games = [];
            let newLast20Games = [];
            let newLast50Games = [];

            if (!data.gamesAll || data.gamesAll.length === 0 || data.gamesAll[0].season !== 2023) {
                let dataIds = lastAllIds;
                for (let i = 0; i < dataIds.length; i++) {
                    try {
                        const response = await axios.request({
                            method: 'GET',
                            url: `https://${VITE_X_RAPIDAPI_HOST2}/games`,
                            params: {
                                id: dataIds[i]
                            },
                            headers: {
                                'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY2,
                                'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST2
                            }
                        });
                        const game = response.data.response[0];
                        allGamesData.push(game);

                        if (i < 5) newLast5Games.push(game);
                        if (i < 10) newLast10Games.push(game);
                        if (i < 20) newLast20Games.push(game);
                        if (i < 50) newLast50Games.push(game);

                        if (i === 4) setLast5Games(newLast5Games);
                        if (i === 9) setLast10Games(newLast10Games);
                        if (i === 19) setLast20Games(newLast20Games);
                        if (i === 49) setLast50Games(newLast50Games);
                    } catch (error) {
                        console.error(error);
                    }
                }
            } else {
                allGamesData = [...data.gamesAll];
                setLast5Games(allGamesData.slice(0, 5));
                setLast10Games(allGamesData.slice(0, 10));
                setLast20Games(allGamesData.slice(0, 20));
                setLast50Games(allGamesData.slice(0, 50));
            }
            setLastAllGames(allGamesData);
        };

        if (!data.gamesAll || data.gamesAll.length === 0 || data.gamesAll[0].season !== 2023) {
            fetchGames();
        }
    }, [data.gamesAll, lastAllIds]);



    useEffect(() => {
        if (data.gamesAll && last5Ids.length) {
            setLast5Games(filterGames(data.gamesAll, last5Ids).reverse());
        }
        if (data.gamesAll && last10Ids.length) {
            setLast10Games(filterGames(data.gamesAll, last10Ids).reverse());
        }
        if (data.gamesAll && last20Ids.length) {
            setLast20Games(filterGames(data.gamesAll, last20Ids).reverse());
        }
        if (data.gamesAll && last50Ids.length) {
            setLast50Games(filterGames(data.gamesAll, last50Ids).reverse());
        }
        if (data.gamesAll && lastAllIds.length) {
            setLastAllGames(filterGames(data.gamesAll, lastAllIds).reverse());
        }
    }, [data.gamesAll, last5Ids, last10Ids, last20Ids, last50Ids, lastAllIds]);


    useEffect(() => {
        setPrimaryColor(selectPrimaryColor(referenceData))
    }, [referenceData]);

    function selectPrimaryColor(referenceData) {
        if (referenceData && referenceData.team)
            for (let i = 0; i < teams.length; i++) {
                if (teams[i] === referenceData.team.name)
                    return primaryColors[i]
            }
        return '#EA6607'
    }

    useEffect(() => {
        setSecondaryColor(selectSecondaryColor(referenceData))
    }, [referenceData]);

    function selectSecondaryColor(referenceData) {
        if (referenceData && referenceData.team)
            for (let i = 0; i < teams.length; i++) {
                if (teams[i] === referenceData.team.name)
                    return secondaryColors[i]
            }
        return '#000000'
    }


    const calculateAveragePointsPerGame = () => {
        if (!playerStats) return null;

        let totalPoints = 0;
        let totalGames = 0;
        playerStats.forEach((stat) => {
            const points = stat.points || 0;
            totalPoints += parseInt(points);
            totalGames++;
        });

        if (totalGames === 0) return 0;

        const averagePointsPerGame = totalPoints / totalGames;
        return averagePointsPerGame.toFixed(2);
    };

    const calculateAverageReboundsPerGame = () => {
        if (!playerStats) return null;

        let totalRebounds = 0;
        let totalGames = 0;
        playerStats.forEach((stat) => {
            const rebounds = stat.totReb || 0;
            totalRebounds += parseInt(rebounds);
            totalGames++;
        });

        if (totalGames === 0) return 0;

        const averageReboundsPerGame = totalRebounds / totalGames;
        return averageReboundsPerGame.toFixed(2);
    };

    const calculateAverageAssistsPerGame = () => {
        if (!playerStats) return null;

        let totalAssists = 0;
        let totalGames = 0;
        playerStats.forEach((stat) => {
            const assists = stat.assists || 0;
            totalAssists += parseInt(assists);
            totalGames++;
        });
        if (totalGames === 0) return 0;
        const averageAssistsPerGame = totalAssists / totalGames;
        return averageAssistsPerGame.toFixed(2);
    };

    const calculateTotalBlocksForSeason = (playerStats) => {
        if (!playerStats) return 0;

        const totalBlocks = playerStats.reduce(
            (total, stat) => total + parseInt(stat.blocks || 0),
            0
        );
        return totalBlocks;
    };

    const calculateTotalAssistsForSeason = (playerStats) => {
        if (!playerStats) return 0;

        const totalAssists = playerStats.reduce(
            (total, stat) => total + parseInt(stat.assists || 0),
            0
        );
        return totalAssists;
    };

    const calculateTotalPointsForSeason = (playerStats) => {
        if (!playerStats) return 0;

        const totalPoints = playerStats.reduce(
            (total, stat) => total + parseInt(stat.points || 0),
            0
        );
        return totalPoints;
    };

    const calculateTS = () => {
        if (!playerStats) return 0;
        const totalPoints = calculateTotalPointsForSeason(playerStats)

        const ts = (totalPoints / (2 * (
            fga.reduce((tot, curr) => tot + curr, 0) +
            0.44 * fta.reduce((tot, curr) => tot + curr, 0)
        ))) * 100

        return ts.toFixed(2);
    };

    const getLastGames = () => {
        if (!playerStats) return [];
        const copyStats = [...playerStats].reverse()
        if (gamesInView === "5")
            return copyStats.slice(0, 5);
        else if (gamesInView === "10")
            return copyStats.slice(0, 10);
        else if (gamesInView === "20")
            return copyStats.slice(0, 20);
        else if (gamesInView === "50")
            return copyStats.slice(0, 50);
        else if (gamesInView === "season")
            return copyStats.slice(0);
    };

    const overrides = {
        Root: {
            style: ({ $theme }) => ({
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px"
            })
        },
    };

    const handleSeasonChange = (params) => {
        const { value } = params;
        if (value.length > 0) {
            setSelectedSeason(value[0].id);
        }
    };
    const seasonOptions = [
        { label: '2020', id: '2020' },
        { label: '2021', id: '2021' },
        { label: '2022', id: '2022' },
        { label: 'Current', id: '2023' },
    ];
    const selectedValue = seasonOptions.filter(option => option.id === selectedSeason);


    const handleGamesChange = (params) => {
        const { value } = params;
        if (value.length > 0) {
            setGamesInView(value[0].id);
        }
    };


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            if (window.innerWidth <= 900)
                handleGamesChange({ value: [{ id: 'season', label: 'season' }] })
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div>
            <Block className="topplayer" display="flex" flexDirection="column" alignItems="center">
                {/* <Block className="filler"></Block> */}
                <Block className="sub__heading" display="flex" justifyContent="center" alignItems="center" width="100%" flexDirection="row" backgroundColor={primaryColor} padding="20px" marginBottom="-10px" >
                    <Block className="wraper" display="flex" justifyContent="center" alignItems="center" flexDirection="row"  >
                        <Block className="head__shot" $style={{ marginBottom: "-6px" }}>
                            <img src={playerImage.image_url || 'https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'} alt="Head Shot" style={{ height: "240px" }} />
                        </Block>
                        <Block className="info" display="flex" flexDirection="column" alignItems="center" $style={{ flexGrow: 3 }}>
                            <HeadingLevel>
                                <Heading styleLevel={screenWidth > 1120 ? 2 : 3} color={secondaryColor}> <span style={{
                                    ...(
                                        screenWidth < 1110 && screenWidth > 945 ? { fontSize: "31px" } :
                                            screenWidth <= 945 && screenWidth > 935 ? { fontSize: "30px" } :
                                                screenWidth <= 935 && screenWidth > 925 ? { fontSize: "29px" } :
                                                    screenWidth <= 925 && screenWidth > 915 ? { fontSize: "28px" } :
                                                        screenWidth <= 915 && screenWidth > 795 ? { fontSize: "27px" } :
                                                            screenWidth <= 795 && screenWidth > 785 ? { fontSize: "26px" } :
                                                                screenWidth <= 785 && screenWidth > 775 ? { fontSize: "25px" } :
                                                                    screenWidth <= 775 && screenWidth > 720 ? { fontSize: "24px" } :
                                                                        screenWidth <= 720 && screenWidth > 710 ? { fontSize: "23px" } :
                                                                            screenWidth <= 710 && screenWidth > 670 ? { fontSize: "22px" } :
                                                                                screenWidth <= 670 && screenWidth > 635 ? { fontSize: "21px" } :
                                                                                    screenWidth <= 635 && screenWidth > 625 ? { fontSize: "20px" } :
                                                                                        screenWidth <= 625 && screenWidth > 610 ? { fontSize: "19px" } :
                                                                                            screenWidth <= 610 && screenWidth > 0 ? { fontSize: "18px" } :
                                                                                                {}
                                    )
                                }}>{data.firstname} {data.lastname} </span></Heading>
                                <Heading styleLevel={screenWidth > 1155 ? 5 : 6} color={secondaryColor}>
                                    <span style={{
                                        ...(
                                            screenWidth <= 1085 && screenWidth > 955 ? { fontSize: "19px" } :
                                                screenWidth <= 955 && screenWidth > 935 ? { fontSize: "18px" } :
                                                    screenWidth <= 935 && screenWidth > 920 ? { fontSize: "17px" } :
                                                        screenWidth <= 920 && screenWidth > 790 ? { fontSize: "16px" } :
                                                            screenWidth <= 790 && screenWidth > 710 ? { fontSize: "15px" } :
                                                                screenWidth <= 710 && screenWidth > 640 ? { fontSize: "14px" } :
                                                                    screenWidth <= 640 && screenWidth > 0 ? { fontSize: "13px" } :
                                                                        {}
                                        )
                                    }}>
                                        {personalData && personalData.height ? personalData.height.feets + "'" + personalData.height.inches + "," : ""} &nbsp;
                                        {personalData && personalData.weight ? personalData.weight.pounds + "lbs" : ""} &nbsp;
                                        {referenceData.team && screenWidth > 630 ? referenceData.team.name : ""} &nbsp;
                                        {personalData && personalData.leagues && personalData.leagues.standard ? "#" + personalData.leagues.standard.jersey : ""} &nbsp;
                                        {referenceData ? referenceData.pos : ""}
                                    </span>
                                </Heading>
                            </HeadingLevel>

                            <Block display="flex" justifyContent="space-around" width="60%">
                                {screenWidth > 825 ?
                                    <>
                                        <LabelMedium color={secondaryColor}>PPG</LabelMedium>
                                        <LabelMedium color={secondaryColor}>RPG</LabelMedium>
                                        <LabelMedium color={secondaryColor}>APG</LabelMedium>
                                        <LabelMedium color={secondaryColor}>TS%</LabelMedium>
                                    </>
                                    :
                                    <>
                                        <LabelSmall color={secondaryColor}>PPG</LabelSmall>
                                        <LabelSmall color={secondaryColor}>RPG</LabelSmall>
                                        <LabelSmall color={secondaryColor}>APG</LabelSmall>
                                        <LabelSmall color={secondaryColor}>TS%</LabelSmall>
                                    </>
                                }
                            </Block>
                            <Block display="flex" justifyContent="space-around" width="60%">
                                {screenWidth > 825 ?
                                    <>
                                        <LabelLarge color={secondaryColor}>{calculateAveragePointsPerGame()}</LabelLarge> &nbsp; &nbsp;
                                        <LabelLarge color={secondaryColor}>{calculateAverageReboundsPerGame()}</LabelLarge> &nbsp; &nbsp;
                                        <LabelLarge color={secondaryColor}>{calculateAverageAssistsPerGame()}</LabelLarge> &nbsp; &nbsp;
                                        <LabelLarge color={secondaryColor}>{calculateTS()}</LabelLarge>
                                    </> : screenWidth > 780 ?
                                        <>
                                            <LabelMedium color={secondaryColor}>{calculateAveragePointsPerGame()}</LabelMedium>&nbsp; &nbsp;
                                            <LabelMedium color={secondaryColor}>{calculateAverageReboundsPerGame()}</LabelMedium>&nbsp; &nbsp;
                                            <LabelMedium color={secondaryColor}>{calculateAverageAssistsPerGame()}</LabelMedium>&nbsp; &nbsp;
                                            <LabelMedium color={secondaryColor}>{calculateTS()}</LabelMedium>
                                        </> :
                                        <>
                                            <LabelSmall color={secondaryColor}><span style={{ ...(screenWidth < 720 ? { fontSize: "13px" } : screenWidth < 645 ? { fontSize: "11px" } : {}) }} >{calculateAveragePointsPerGame()}</span></LabelSmall> &nbsp; &nbsp;
                                            <LabelSmall color={secondaryColor}><span style={{ ...(screenWidth < 720 ? { fontSize: "13px" } : screenWidth < 645 ? { fontSize: "11px" } : {}) }} >{calculateAverageReboundsPerGame()}</span></LabelSmall>&nbsp; &nbsp;
                                            <LabelSmall color={secondaryColor}><span style={{ ...(screenWidth < 720 ? { fontSize: "13px" } : screenWidth < 645 ? { fontSize: "11px" } : {}) }} >{calculateAverageAssistsPerGame()}</span></LabelSmall>&nbsp; &nbsp;
                                            <LabelSmall color={secondaryColor}><span style={{ ...(screenWidth < 720 ? { fontSize: "13px" } : screenWidth < 645 ? { fontSize: "11px" } : {}) }} >{calculateTS()}</span></LabelSmall>
                                        </>
                                }
                            </Block>
                        </Block>
                        <Block className="team__logo" >
                            <Avatar
                                overrides={{
                                    Avatar: {
                                        style: ({ $theme }) => ({
                                            borderRadius: "0",
                                            width: 'auto',
                                            objectFit: 'contain',
                                            height: 'auto',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                        }),
                                    },
                                    Root: {
                                        style: ({ $theme }) => ({
                                            borderRadius: "0",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'visible',
                                            width: screenWidth > 1075 ? '170px' :
                                                screenWidth > 1050 ? '145px' :
                                                    screenWidth > 1040 ? '135px' :
                                                        screenWidth > 1030 ? '125px' :
                                                            screenWidth > 665 ? '120px' :
                                                                '110px',
                                            height: '170px',
                                            marginLeft: '25px',
                                            marginRight: screenWidth > 901 ? '-20px' : "30px",
                                            marginTop: screenWidth <= 901 && screenWidth > 780 ? '25px' :
                                                screenWidth <= 780 && screenWidth > 700 ? '45px' :
                                                    screenWidth <= 700 ? '65px' :
                                                        "0px"
                                        }),
                                    },
                                }}
                                name={referenceData.team ? referenceData.team.name : ""}
                                size="100px"
                                src={referenceData.team ? referenceData.team.logo : ""}
                            />
                        </Block>
                        <Block className="selector" width="auto" display="flex" marginBottom="170px" marginLeft="25px" marginRight="10px"
                            $style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "0px", gap: "10px" }}    >
                            <Select
                                options={[
                                    { id: '5', label: '5' },
                                    { id: '10', label: '10' },
                                    { id: '20', label: '20' },
                                    { id: '50', label: '50' },
                                    { id: 'season', label: 'season' },
                                ]}
                                labelKey="label"
                                valueKey="id"
                                onChange={handleGamesChange}
                                value={[{ id: '0', label: 'Games' }]}
                                placeholder={<Block> &nbsp;&nbsp;Games&nbsp;&nbsp; </Block>}
                                clearable={false}
                                overrides={{
                                    ControlContainer: {
                                        style: {
                                            minHeight: '35px', height: '35px', paddingLeft: '15px',
                                            paddingRight: '5px',
                                            borderRadius: "8px",
                                            cursor: 'default'
                                        }
                                    },
                                    ValueContainer: { style: { minHeight: '30px', height: '30px', padding: '0px' } },
                                    Placeholder: { style: { lineHeight: '30px' } },
                                    SingleValue: { style: { lineHeight: '30px' } },
                                    OptionContent: { style: { cursor: 'default' }, },
                                    DropdownContainer: { style: { cursor: 'default' } },
                                    DropdownListItem: { style: { cursor: 'default' } },
                                    InputContainer: { style: { cursor: 'default' } },
                                    Input: { style: { cursor: 'default' } },
                                    Root: { style: { width: '122px' } }
                                }}

                            />
                        </Block>
                    </Block>
                </Block>

                <Block className="chart-container" marginTop="30px" >
                    <Block className="left" marginTop={last5Games && last5Games[0] && last5Games[0].date && last5Games[0].date.start ? "-90px" : "-1px"} >
                        {points && points.length > 0 ? <HistogramWithAxis title={`Points`} data={points}></HistogramWithAxis> : <Spin></Spin>}
                        {assists && assists.length > 0 ? <HistogramWithAxis title={`Assist`} data={assists}></HistogramWithAxis> : <Spin></Spin>}
                        {rebounds && rebounds.length > 0 ? <HistogramWithAxis title={`Rebounds`} data={rebounds}></HistogramWithAxis> : <Spin></Spin>}
                        {fga && fga.length > 0 ? <HistogramWithAxis title={`fga`} data={fga}></HistogramWithAxis> : <Spin></Spin>}
                    </Block>
                    <Block className="middle" marginLeft="-10px" marginRight="-10px">
                        <Block className="divider" width="100%" display="flex" flexDirection="column" alignItems="center" marginTop="5px">
                            {screenWidth > 800 ?
                                <HeadingMedium className="mainSubHeading" backgroundColor={isHighlighted ? "#EA6607" : "none"}
                                    $style={{ color: "white", zIndex: "1", transition: "background-color 0.5s ease-in-out" }}>
                                    Current Season Stats
                                </HeadingMedium> :
                                <HeadingSmall className="mainSubHeading" backgroundColor={isHighlighted ? "#EA6607" : "none"}
                                    $style={{ color: "white", zIndex: "1", transition: "background-color 0.5s ease-in-out" }}>
                                    Current Season Stats
                                </HeadingSmall>}
                            {points.length > 0 ? (
                                <Block className="graph"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    marginTop="-60px"
                                    marginBottom="-40px">
                                    <MyGraph
                                        playerStats={playerStats}
                                        points={points}
                                        assists={assists}
                                        rebounds={rebounds}
                                        threePoints={threePoints}
                                        plusMinus={plusMinus}
                                        minutes={minutes}
                                        blocks={blocks}
                                    />
                                </Block>
                            ) : (
                                <Spin />
                            )}
                        </Block>
                        <Block width="100%" overflow="auto">
                            {playerStats ? (
                                <Table
                                    overrides={overrides}
                                    columns={["Season", "MPG", "PPG", "RPG", "APG", "SPG", "BPG", "TPG", "FG%", "3P%", "FT%", "DD", "TD"
                                    ]}
                                    data={[
                                        [
                                            selectedSeason,
                                            (minutes.map(e => Number(e)).reduce((tot, curr) => tot + curr, 0) / minutes.length).toFixed(2),
                                            (points.map(e => Number(e)).reduce((tot, curr) => tot + curr, 0) / points.length).toFixed(2),
                                            (rebounds.map(e => Number(e)).reduce((tot, curr) => tot + curr, 0) / rebounds.length).toFixed(2),
                                            (assists.map(e => Number(e)).reduce((tot, curr) => tot + curr, 0) / assists.length).toFixed(2),
                                            (steals.map(e => Number(e)).reduce((tot, curr) => tot + curr, 0) / steals.length).toFixed(2),
                                            (blocks.map(e => Number(e)).reduce((tot, curr) => tot + curr, 0) / blocks.length).toFixed(2),
                                            (turnovers.map(e => Number(e)).reduce((tot, curr) => tot + curr, 0) / turnovers.length).toFixed(2),
                                            (fgp.map(e => Number(e)).reduce((tot, curr) => tot + curr, 0) / fgp.length).toFixed(2),
                                            (tpp.map(e => Number(e)).reduce((tot, curr) => tot + curr, 0) / tpp.length).toFixed(2),
                                            (ftp.map(e => Number(e)).reduce((tot, curr) => tot + curr, 0) / ftp.length).toFixed(2),
                                            dd,
                                            td,


                                        ],
                                    ]}
                                />
                            ) : (
                                <Spin></Spin>
                            )}
                        </Block>
                        <Block width="100%" display="flex" justifyContent="center" flexDirection="column" marginTop={last5Games && last5Games[0] && last5Games[0].date && last5Games[0].date.start ? "15px" : "30px"}
                            marginBottom="80px" maxHeight="465px">
                            <Block display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%" marginBottom="-8px" >
                                <HeadingSmall backgroundColor={isHighlightedGames ? "#EA6607" : "black"} $style={{ color: "white", backgroundColor: isHighlightedGames ? "#EA6607" : "black", transition: "background-color 0.5s ease-in-out", width: '100%', justifyContent: "center", alignItems: "center", display: "flex", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                                    {gamesInView === '5' ? `Last 5 Games Played` : gamesInView === '10' ? `Last 10 Games Played` : gamesInView === '20' ? `Last 20 Games Played` : gamesInView === '50' ? `Last 50 Games Played` : `Season Played Games`}
                                </HeadingSmall>
                            </Block>
                            {playerStats ? (
                                <Table
                                    overrides={{
                                        TableBodyCell: {
                                            style: ({ $theme }) => ({

                                            }),
                                        },
                                    }}
                                    columns={["Game #", "Date", "Team", "Opp", "Score", "Min", "FGM", "FGA", "FG%", "3PM", "3PA", "3P%",
                                        "FTM", "FTA", "FT%", "OREB", "DREB", "REB", "AST", "STLS", "BLK", "TO", "PF", "PTS", "+/-"]}
                                    data={getLastGames().map((game, index) => {
                                        const games = gamesInView === '5' ? last5Games : gamesInView === '10' ? last10Games : gamesInView === '20' ? last20Games : gamesInView === '50' ? last50Games : lastAllGames
                                        if (games.length > 0 && games && games[index] && games[index].date) {
                                            return [lastAllGames.length - index, games[index].date.start.split("T")[0].replace(/[-]/g, "/"),
                                            `${referenceData.team ? referenceData.team.nickname.replace(/[\s]/g, "") + " " + referenceData.team.code : <Spinner $color="#EA6607" $size={SIZE.small} />}`,
                                            `${referenceData.team
                                                ? games[index].teams.home
                                                    ? referenceData.team.name === games[index].teams.home.name
                                                        ? games[index].teams.visitors.nickname.replace(/[\s]/g, "") + " " + games[index].teams.visitors.code
                                                        : games[index].teams.home.nickname.replace(/[\s]/g, "") + " " + games[index].teams.home.code
                                                    : <Spinner $color="#EA6607" $size={SIZE.small} />
                                                : <Spinner $color="#EA6607" $size={SIZE.small} />}`,
                                            `${referenceData.team
                                                ? games[index].teams.home
                                                    ? referenceData.team.name === games[index].teams.home.name
                                                        ? games[index].scores.home.points + "-" + games[index].scores.visitors.points
                                                        : games[index].scores.visitors.points + "-" + games[index].scores.home.points
                                                    : <Spinner $color="#EA6607" $size={SIZE.small} />
                                                : <Spinner $color="#EA6607" $size={SIZE.small} />}`,
                                            game.min, game.fgm, game.fga, game.fgp, game.tpm, game.tpa,
                                            game.tpp, game.ftm, game.fta, game.ftp, game.offReb, game.defReb, game.totReb, game.assists,
                                            game.steals, game.blocks, game.turnovers, game.pFouls, game.points, game.plusMinus]
                                        }
                                        else {
                                            return [<Spinner $color="#EA6607" $size={SIZE.small} />, <Spinner $color="#EA6607" $size={SIZE.small} />, <Spinner $color="#EA6607" $size={SIZE.small} />, <Spinner $color="#EA6607" $size={SIZE.small} />, game.min, game.fgm, game.fga, game.fgp, game.tpm, game.tpa,
                                            game.tpp, game.ftm, game.fta, game.ftp, game.offReb, game.defReb, game.totReb, game.assists,
                                            game.steals, game.blocks, game.turnovers, game.pFouls, game.points, game.plusMinus]
                                        }
                                    }
                                    )}
                                />
                            ) : (
                                <Spin></Spin>
                            )}
                        </Block>
                    </Block>
                    <Block className="right" marginTop={last5Games && last5Games[0] && last5Games[0].date && last5Games[0].date.start ? "-90px" : "-1px"}>
                        {turnovers && turnovers.length > 0 ? <HistogramWithAxis title={`Turnovers`} data={turnovers}></HistogramWithAxis> : <Spin></Spin>}
                        {tpm && tpm.length > 0 ? <HistogramWithAxis title={`Three Pointers`} data={tpm}></HistogramWithAxis> : <Spin></Spin>}
                        {plusMinus && plusMinus.length > 0 ? <HistogramWithAxis title={`+/-`} data={plusMinus}></HistogramWithAxis> : <Spin></Spin>}
                        {fgp && fgp.length > 0 ? <HistogramWithAxis title={`fg%`} data={fgp}></HistogramWithAxis> : <Spin></Spin>}
                    </Block>
                </Block>
            </Block>
        </div>
    );
}

export default PlayerExample;