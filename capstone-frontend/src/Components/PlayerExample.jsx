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

function PlayerExample({ data, playerid }) {
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
                <Block className="filler"></Block>
                <Block className="sub__heading" display="flex" justifyContent="space-between" alignItems="center" width="100%" backgroundColor="#ED751C" padding="20px">
                    <Block className="head__shot" $style={{ maxWidth: "250px", flexGrow: 1, marginLeft: "160px", marginBottom: "-6px" }}>
                        <img src={playerImage.image_url || 'https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'} alt="Head Shot" style={{ height: "260px" }} />
                    </Block>
                    <Block className="info" display="flex" flexDirection="column" alignItems="center" $style={{ flexGrow: 3 }}>
                        <Block width="auto" maxWidth="300px" display="flex" alignItems="center" marginBottom="20px" marginTop="-30px">
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
                        <HeadingLevel>
                            <Heading styleLevel={3}>{data.firstname} {data.lastname}</Heading>
                            <Heading styleLevel={6}>
                                {personalData && personalData.height ? personalData.height.feets + "'" + personalData.height.inches + "," : ""} &nbsp;
                                {personalData && personalData.weight ? personalData.weight.pounds + "lbs" : ""} &nbsp;
                                {referenceData.team ? referenceData.team.name : ""} &nbsp;
                                {personalData && personalData.leagues ? "#" + personalData.leagues.standard.jersey : ""} &nbsp;
                                {referenceData ? referenceData.pos : ""}
                            </Heading>
                        </HeadingLevel>

                        <Block display="flex" justifyContent="space-around" width="60%">
                            <LabelXSmall>PPG</LabelXSmall>
                            <LabelXSmall>RPG</LabelXSmall>
                            <LabelXSmall>APG</LabelXSmall>
                            <LabelXSmall>TS%</LabelXSmall>
                        </Block>
                        <Block display="flex" justifyContent="space-around" width="60%">
                            <LabelMedium>{calculateAveragePointsPerGame()}</LabelMedium>
                            <LabelMedium>{calculateAverageReboundsPerGame()}</LabelMedium>
                            <LabelMedium>{calculateAverageAssistsPerGame()}</LabelMedium>
                            <LabelMedium>{calculateTS()}</LabelMedium>
                        </Block>
                    </Block>
                    <Block className="team__logo" $style={{ flexGrow: 1, marginRight: "100px" }}>
                        {/* <img src={referenceData.team.logo} alt="Team Logo" style={{ height: "150px" }} /> */}
                        <Avatar
                            overrides={{
                                Avatar: {
                                    style: ({ $theme }) => ({
                                        borderRadius: "0",
                                        width: 'auto',
                                        objectFit: 'contain',
                                        height: 'auto',
                                        width: 'auto',
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
                </Block>

                <Block className="chart-container"  >
                    <Block className="left">
                        <HistogramWithAxis></HistogramWithAxis>
                        <HistogramWithAxis></HistogramWithAxis>
                        <HistogramWithAxis></HistogramWithAxis>
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
                                <p>Loading...</p>
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
                                <p>Loading...</p>
                            )}
                        </Block>
                    </Block>
                    <Block className="right">
                        <HistogramWithAxis></HistogramWithAxis>
                        <HistogramWithAxis></HistogramWithAxis>
                        <HistogramWithAxis></HistogramWithAxis>
                    </Block>
                </Block>
            </Block>
        </div>
    );
}

export default PlayerExample;
