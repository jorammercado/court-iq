import React, { useEffect, useState } from "react";
import { Table } from "baseui/table-semantic";
import Spin from "./SpinLoad";
import axios from "axios";
import MyGraph from "./MyChart";
import { useNavigate } from "react-router-dom"
import "./PlayerExample.scss"
import { Block } from "baseui/block";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Avatar } from "baseui/avatar";
import { Select } from 'baseui/select';
import {
    LabelMedium,
    LabelXSmall,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall
} from "baseui/typography";
import { HistogramWithAxis } from "./HistogramWithAxis";
import { Card, StyledBody } from "baseui/card";
import { useStyletron } from "baseui";
import {
    StatefulDataTable,
    BooleanColumn,
    CategoricalColumn,
    CustomColumn,
    NumericalColumn,
    StringColumn,
    COLUMNS,
    NUMERICAL_FORMATS,
} from "baseui/data-table";

const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;
const VITE_X_RAPIDAPI_URL3 = import.meta.env.VITE_X_RAPIDAPI_URL3;
const VITE_X_RAPIDAPI_URL2 = import.meta.env.VITE_X_RAPIDAPI_URL2;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function PlayerExample({ data, playerid, isSearchVisible, setIsSearchVisible }) {

    useEffect(() => {
        if (isSearchVisible) {
            setIsSearchVisible(false);
        }
    }, [isSearchVisible]);

    let navigate = useNavigate()
    const [isScreenLargeEnough, setIsScreenLargeEnough] = useState(window.innerWidth > 768);

    useEffect(() => {
        function handleResize() {
            setIsScreenLargeEnough(window.innerWidth > 768);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const [primaryColor, setPrimaryColor] = useState("#ED751C")
    const [secondaryColor, setSecondaryColor] = useState("#000000")
    const primaryColors = ["#C8102E", "#007A33", "#000000", "#1D1160", "#CE1141", "#860038", "#00538C", "#0E2240", "#C8102E", "#1D428A", "#CE1141", "#002D62", "#C8102E", "#552583", "#5D76A9", "#98002E", "#00471B", "#0C2340", "#0C2340", "#006BB6", "#007AC1", "#0077C0", "#006BB6", "#1D1160", "#E03A3E", "#5A2D81", "#C4CED4", "#CE1141", "#002B5C", "#002B5C"]
    const secondaryColors = ["#FDB927", "#BA9653", "#FFFFFF", "#00788C", "#000000", "#041E42", "#002B5E", "#FEC524", "#1D42BA", "#FFC72C", "#000000", "#FDBB30", "#1D428A", "#FDB927", "#12173F", "#F9A01B", "#EEE1C6", "#236192", "#C8102E", "#F58426", "#EF3B24", "#C4CED4", "#ED174C", "#E56020", "#000000", "#63727A", "#000000", "#000000", "#00471B", "#E31837"]
    const tertiaryColors = ["#000000", "#963821", "#FFFFFF", "#A1A1A4", "#000000", "#FDBB30", "#B8C4CA", "#8B2131", "#BEC0C2", "#FFC72C", "#C4CED4", "#BEC0C2", "#BEC0C2", "#000000", "#F5B112", "#000000", "#0077C0", "#9EA2A2", "#85714D", "#BEC0C2", "#002D62", "#000000", "#002B5C", "#000000", "#000000", "#000000", "#000000", "#A1A1A4", "#F9A01B", "#C4CED4"]
    const quaternaryColors = ["#9EA2A2", "#FFFFFF", "#FFFFFF", "#A1A1A4", "#000000", "#000000", "#000000", "#1D428A", "#002D62", "#FFC72C", "#C4CED4", "BEC0C2", "#000000", "#000000", "#707271", "#000000", "#000000", "#78BE20", "#85714D", "#000000", "#FDBB30", "#000000", "#C4CED4", "#63727A", "#000000", "#000000", "#000000", "#B4975A", "#F9A01B", "#C4CED4"]
    const quinaryColors = ["#FFFFFF", "#000000", "#FFFFFF", "#A1A1A4", "#000000", "#000000", "#000000", "#1D428A", "#002D62", "#FFC72C", "#C4CED4", "BEC0C2", "#000000", "#000000", "#707271", "#000000", "#000000", "#78BE20", "#85714D", "#000000", "#FDBB30", "#000000", "#C4CED4", "#F9AD1B", "#000000", "#000000", "#000000", "#B4975A", "#F9A01B", "#C4CED4"]
    const teams = ['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons',
        'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves',
        'New Orleans Pelicans', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings',
        'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards']

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
    const [last5Ids, setLast5Ids] = useState([])
    const [tpm, setTPM] = useState([]);

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
                console.log(response.data)
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
                setLast5Ids([response.data.response[response.data.response.length - 1].game.id,
                response.data.response[response.data.response.length - 2].game.id,
                response.data.response[response.data.response.length - 3].game.id,
                response.data.response[response.data.response.length - 4].game.id,
                response.data.response[response.data.response.length - 5].game.id])
                setTPM(response.data.response.map((e) => e.tpm));
            } catch (error) {
                console.error("Error fetching player statistics:", error);
            }
        };
        fetchPlayerStats();
    }, [playerid, selectedSeason]);


    useEffect(() => {
        const fetchLast5Games = async () => {
            const data = []
            for (let i = 0; i < last5Ids.length; i++) {
                try {
                    const response = await axios.request({
                        method: 'GET',
                        url: `https://${VITE_X_RAPIDAPI_HOST2}/games`,
                        params: {
                            id: last5Ids[i]
                        },
                        headers: {
                            'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY2,
                            'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST2
                        }
                    });
                    data.push(response.data.response[0]);
                } catch (error) {
                    console.error(error);
                }
            }
            setLast5Games(data);
            console.log("LAST5=", data)
        };
        fetchLast5Games();
    }, [last5Ids]);

    useEffect(() => {
        setPrimaryColor(selectPrimaryColor(referenceData))
    }, [referenceData]);

    function selectPrimaryColor(referenceData) {
        if (referenceData && referenceData.team)
            for (let i = 0; i < teams.length; i++) {
                if (teams[i] === referenceData.team.name)
                    return primaryColors[i]
            }
        return '#ED751C'
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

    const getLastFiveGames = () => {
        if (!playerStats) return [];
        const copyStats = [...playerStats].reverse()

        return copyStats.slice(0, 5);
    };

    const overrides = {};

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


    return (
        <div>
            <Block width="100%" display="flex" flexDirection="column" alignItems="center">
                {/* <Block className="filler"></Block> */}
                <Block className="sub__heading" display="flex" justifyContent="space-between" alignItems="center" width="100%" backgroundColor={primaryColor} padding="20px">
                    <Block className="head__shot" $style={{ maxWidth: "250px", flexGrow: 1, marginLeft: "160px", marginBottom: "-6px" }}>
                        <img src={playerImage.image_url || 'https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'} alt="Head Shot" style={{ height: "260px" }} />
                    </Block>
                    <Block className="info" display="flex" flexDirection="column" alignItems="center" $style={{ flexGrow: 3 }}>
                        <HeadingLevel>
                            <Heading styleLevel={3} color={secondaryColor}>{data.firstname} {data.lastname} </Heading>
                            <Heading styleLevel={6} color={secondaryColor}>
                                {personalData && personalData.height ? personalData.height.feets + "'" + personalData.height.inches + "," : ""} &nbsp;
                                {personalData && personalData.weight ? personalData.weight.pounds + "lbs" : ""} &nbsp;
                                {referenceData.team ? referenceData.team.name : ""} &nbsp;
                                {personalData && personalData.leagues && personalData.leagues.standard ? "#" + personalData.leagues.standard.jersey : ""} &nbsp;
                                {referenceData ? referenceData.pos : ""}
                            </Heading>
                        </HeadingLevel>

                        <Block display="flex" justifyContent="space-around" width="60%">
                            <LabelXSmall color={secondaryColor}>PPG</LabelXSmall>
                            <LabelXSmall color={secondaryColor}>RPG</LabelXSmall>
                            <LabelXSmall color={secondaryColor}>APG</LabelXSmall>
                            <LabelXSmall color={secondaryColor}>TS%</LabelXSmall>
                        </Block>
                        <Block display="flex" justifyContent="space-around" width="60%">
                            <LabelMedium color={secondaryColor}>{calculateAveragePointsPerGame()}</LabelMedium>
                            <LabelMedium color={secondaryColor}>{calculateAverageReboundsPerGame()}</LabelMedium>
                            <LabelMedium color={secondaryColor}>{calculateAverageAssistsPerGame()}</LabelMedium>
                            <LabelMedium color={secondaryColor}>{calculateTS()}</LabelMedium>
                        </Block>
                    </Block>
                    <Block className="team__logo" $style={{ flexGrow: 1, marginRight: "100px", marginLeft:"-100px" }}>
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
                                        width: '170px',
                                        height: '170px',
                                    }),
                                },
                            }}
                            name={referenceData.team ? referenceData.team.name : ""}
                            size="100px"
                            src={referenceData.team ? referenceData.team.logo : ""}
                        />
                    </Block>
                    <Block className="selector" width="auto" maxWidth="300px" display="flex" alignItems="center" marginBottom="0px" marginTop="0px" marginRight="100px" marginLeft="-75px">
                        <Select
                            options={[
                                { id: '2020', label: '2020-2021' },
                                { id: '2021', label: '2021-2022' },
                                { id: '2022', label: '2022-2023' },
                                { id: '2023', label: '2023-2024' },
                            ]}
                            labelKey="label"
                            valueKey="id"
                            onChange={handleSeasonChange}
                            value={selectedValue}
                            placeholder="Select..."
                            clearable={false}
                        />
                    </Block>
                </Block>

                <Block className="chart-container"  >
                    <Block className="left">
                        <HistogramWithAxis title={`Points`} data={points}></HistogramWithAxis>
                        <HistogramWithAxis title={`Assist`} data={assists}></HistogramWithAxis>
                        <HistogramWithAxis title={`Rebounds`} data={rebounds}></HistogramWithAxis>
                    </Block>
                    <Block className="middle">
                        <Block className="divider" width="100%" display="flex" flexDirection="column" alignItems="center">
                            <HeadingLarge color="black">Season Stats</HeadingLarge>
                            {points.length > 0 ? (
                                <Block className="graph" display="flex" justifyContent="center" alignItems="center" marginTop="-60px">
                                    {isScreenLargeEnough ?
                                        <MyGraph
                                            playerStats={playerStats}
                                            points={points}
                                            assists={assists}
                                            rebounds={rebounds}
                                            threePoints={threePoints}
                                            plusMinus={plusMinus}
                                            minutes={minutes}
                                            blocks={blocks}
                                        /> : <div></div>
                                    }
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
                        <Block width="100%" overflow="auto">
                            <Block display="flex" justifyContent="center" width="100%">
                                <HeadingSmall color="black" marginTop="20px">Last 5 Games</HeadingSmall>
                            </Block>

                            {playerStats ? (
                                <Table
                                    overrides={overrides}
                                    columns={["Date", "Team", "Opp", "Score", "Min", "FGM", "FGA", "FG%", "3PM", "3PA", "3P%",
                                        "FTM", "FTA", "FT%", "OREB", "DREB", "REB", "AST", "STLS", "BLK", "TO", "PF", "PTS", "+/-"]}
                                    data={getLastFiveGames().map((game, index) => {
                                        if (last5Games.length > 0) {
                                            return [last5Games[index].date.start.split("T")[0].replace(/[-]/g, "/"),
                                            `${referenceData.team ? referenceData.team.name : "n/a"}`,
                                            `${referenceData.team
                                                ? last5Games[index].teams.home
                                                    ? referenceData.team.name === last5Games[index].teams.home.name
                                                        ? last5Games[index].teams.visitors.name
                                                        : last5Games[index].teams.home.name
                                                    : "n/a"
                                                : "n/a"}`,
                                            `${referenceData.team
                                                ? last5Games[index].teams.home
                                                    ? referenceData.team.name === last5Games[index].teams.home.name
                                                        ? last5Games[index].scores.home.points + "-" + last5Games[index].scores.visitors.points
                                                        : last5Games[index].scores.visitors.points + "-" + last5Games[index].scores.home.points
                                                    : "n/a"
                                                : "n/a"}`,
                                            game.min, game.fgm, game.fga, game.fgp, game.tpm, game.tpa,
                                            game.tpp, game.ftm, game.fta, game.ftp, game.offReb, game.defReb, game.totReb, game.assists,
                                            game.steals, game.blocks, game.turnovers, game.pFouls, game.points, game.plusMinus]
                                        }
                                        else {
                                            return ["n/a", "n/a", "n/a", "n/a", game.min, game.fgm, game.fga, game.fgp, game.tpm, game.tpa,
                                                game.tpp, game.ftm, game.fta, game.ftp, game.offReb, game.defReb, game.totReb, game.assists,
                                                game.steals, game.blocks, game.turnovers, game.pFouls, game.points, game.plusMinus]
                                        }
                                    }, last5Games
                                    )}
                                />
                            ) : (
                                <Spin></Spin>
                            )}
                        </Block>
                    </Block>
                    <Block className="right">
                        <HistogramWithAxis title={`Turnovers`} data={turnovers}></HistogramWithAxis>
                        <HistogramWithAxis title={`Three Pointers`} data={tpm}></HistogramWithAxis>
                        <HistogramWithAxis title={`+/-`} data={plusMinus}></HistogramWithAxis>
                    </Block>
                </Block>
            </Block>
        </div>
    );
}

export default PlayerExample;
