import React, { useEffect, useState } from 'react';
import TeamStatsComponent from '../Components/TeamStatsComponent';
import PlayerCardWrap from '../Components/PlayerCardWrap'
import TeamScheduleComponent from '../Components/TeamScheduleComponent';
import TeamPlayerLeaderCard from '../Components/TeamPlayerLeaderCard';
import "./TeamsPage.scss"
import axios from 'axios';
import { Block } from "baseui/block";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Select } from 'baseui/select';
import { Avatar } from "baseui/avatar";
import "../App.scss"
import GameOddsStandings from '../Components/GameOddsRosters';

const TeamsPage = ({ isSearchVisible, setIsSearchVisible }) => {

    const [fontFamily, setFontFamily] = useState('UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif')
    const [primaryColor, setPrimaryColor] = useState("#EA6607")
    const [secondaryColor, setSecondaryColor] = useState("#000000")
    const primaryColors = ["#C8102E", "#007A33", "#000000", "#1D1160", "#CE1141", "#860038", "#00538C", "#0E2240", "#C8102E", "#1D428A", "#CE1141", "#002D62", "#C8102E", "#552583", "#5D76A9", "#98002E", "#00471B", "#0C2340", "#0C2340", "#006BB6", "#007AC1", "#0077C0", "#006BB6", "#1D1160", "#E03A3E", "#5A2D81", "#C4CED4", "#CE1141", "#002B5C", "#002B5C"]
    const secondaryColors = ["#FDB927", "#BA9653", "#FFFFFF", "#00788C", "#000000", "#FDBB30", "#B8C4CA", "#FEC524", "#BEC0C2", "#FFC72C", "#000000", "#FDBB30", "#1D428A", "#FDB927", "#12173F", "#F9A01B", "#EEE1C6", "#236192", "#C8102E", "#F58426", "#EF3B24", "#C4CED4", "#ED174C", "#E56020", "#000000", "#63727A", "#000000", "#000000", "#F9A01B", "#E31837"]
    const teams = ['Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 'Detroit Pistons',
        'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 'Milwaukee Bucks', 'Minnesota Timberwolves',
        'New Orleans Pelicans', 'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers', 'Sacramento Kings',
        'San Antonio Spurs', 'Toronto Raptors', 'Utah Jazz', 'Washington Wizards']
    const fontsfamilies = ['bucks', 'bulls', 'cavaliers', 'celtics', 'clippers', 'grizzlies', 'hawks', 'heat', 'hornets', 'jazz', 'kings', 'knicks', 'lakers',
        'magic', 'mavericks', 'nets', 'nuggets', 'pacers', 'pelicans', 'pistons', 'raptors', 'rockets', 'spurs', 'suns', 'timberwolves', 'trailblazers', 'warriors', 'wizards', '76ers']

    const teamOptions = [
        { id: '1', label: 'Atlanta Hawks' },
        { id: '2', label: 'Boston Celtics' },
        { id: '4', label: 'Brooklyn Nets' },
        { id: '5', label: 'Charlotte Hornets' },
        { id: '6', label: 'Chicago Bulls' },
        { id: '7', label: 'Cleveland Cavaliers' },
        { id: '8', label: 'Dallas Mavericks' },
        { id: '9', label: 'Denver Nuggets' },
        { id: '10', label: 'Detroit Pistons' },
        { id: '11', label: 'Golden State Warriors' },
        { id: '14', label: 'Houston Rockets' },
        { id: '15', label: 'Indiana Pacers' },
        { id: '16', label: 'LA Clippers' },
        { id: '17', label: 'Los Angeles Lakers' },
        { id: '19', label: 'Memphis Grizzlies' },
        { id: '20', label: 'Miami Heat' },
        { id: '21', label: 'Milwaukee Bucks' },
        { id: '22', label: 'Minnesota Timberwolves' },
        { id: '23', label: 'New Orleans Pelicans' },
        { id: '24', label: 'New York Knicks' },
        { id: '25', label: 'Oklahoma City Thunder' },
        { id: '26', label: 'Orlando Magic' },
        { id: '27', label: 'Philadelphia 76ers' },
        { id: '28', label: 'Phoenix Suns' },
        { id: '29', label: 'Portland Trail Blazers' },
        { id: '30', label: 'Sacramento Kings' },
        { id: '31', label: 'San Antonio Spurs' },
        { id: '38', label: 'Toronto Raptors' },
        { id: '40', label: 'Utah Jazz' },
        { id: '41', label: 'Washington Wizards' },
    ];

    const [games5, setGames5] = useState([]);
    const [games10, setGames10] = useState([]);
    const [games20, setGames20] = useState([]);
    const [games50, setGames50] = useState([]);
    const [gamesAll, setGamesAll] = useState([]);

    const handleGames5Change = (newGames5) => setGames5(newGames5);
    const handleGames10Change = (newGames10) => setGames10(newGames10);
    const handleGames20Change = (newGames20) => setGames20(newGames20);
    const handleGames50Change = (newGames50) => setGames50(newGames50);
    const handleGamesAllChange = (newGamesAll) => setGamesAll(newGamesAll);

    function getRandomTeamId() {
        const randomIndex = Math.floor(Math.random() * teamOptions.length);
        return [teamOptions[randomIndex].id, teamOptions[randomIndex].label]
    }
    const init = getRandomTeamId();

    const calculateMarginLeft = () => {
        const screenWidth = window.innerWidth;
        // console.log("SCREEN WIDTH", screenWidth)
        return screenWidth > 1425 ? ((screenWidth - 1425) / 2) + 65 : 50;
    };
    const [marginLeft, setMarginLeft] = useState(calculateMarginLeft());
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setMarginLeft(calculateMarginLeft());
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDataFromChild = (data) => {
        setTeam(data.team)
    };

    const [team, setTeam] = useState({})
    const [teamId, setTeamId] = useState(init[0]);
    const [season, setSeason] = useState('2023');
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedTeamName, setSelectedTeamName] = useState(init[1]);
    const [gamesInView, setGamesInView] = useState('5')
    const [eventIds, setEventIds] = useState([]);

    const [isHighlighted, setIsHighlighted] = useState(false);
    useEffect(() => {
        if (gamesInView) {
            setIsHighlighted(true);
            const timer = setTimeout(() => {
                setIsHighlighted(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [gamesInView]);

    const [isHighlightedSeason, setIsHighlightedSeason] = useState(false);
    useEffect(() => {
        if (season) {
            setIsHighlightedSeason(true);
            const timer = setTimeout(() => {
                setIsHighlightedSeason(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [season]);

    const [isHighlightedLeaders, setIsHighlightedLeaders] = useState(false);
    useEffect(() => {
        if (selectedTeamName) {
            setIsHighlightedLeaders(true);
            setIsHighlightedSeason(true);
            setIsHighlighted(true);
            const timer = setTimeout(() => {
                setIsHighlightedLeaders(false);
                setIsHighlighted(false);
                setIsHighlightedSeason(false);
            }, 850);

            return () => clearTimeout(timer);
        }
    }, [selectedTeamName]);

    const [avatarBackgroundColor, setAvatarBackgroundColor] = useState("none")
    useEffect(() => {
        if (selectedTeamName === "Houston Rockets" || selectedTeamName === "LA Clippers")
            setAvatarBackgroundColor("black")
        else
            setAvatarBackgroundColor("none")
    }, [selectedTeamName]);

    useEffect(() => {
        setFontFamily(selectFontFamily(selectedTeamName))
    }, [selectedTeamName]);

    function selectFontFamily(selectedTeamName) {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i] === selectedTeamName && fontsfamilies.includes(teams[i].split(" ")[teams[i].split(" ").length - 1].toLowerCase()))
                return fontsfamilies[fontsfamilies.indexOf(teams[i].split(" ")[teams[i].split(" ").length - 1].toLowerCase())]
        }
        return 'UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif'
    }


    useEffect(() => {
        setPrimaryColor(selectPrimaryColor(selectedTeamName))
    }, [selectedTeamName]);

    function selectPrimaryColor(selectedTeamName) {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i] === selectedTeamName)
                return primaryColors[i]
        }
        return '#EA6607'
    }

    useEffect(() => {
        setSecondaryColor(selectSecondaryColor(selectedTeamName))
    }, [selectedTeamName]);

    function selectSecondaryColor(selectedTeamName) {
        for (let i = 0; i < teams.length; i++) {
            if (teams[i] === selectedTeamName)
                return secondaryColors[i]
        }
        return '#000000'
    }

    useEffect(() => {
        const fetchEventsForTeam = async () => {
            const apiKey = import.meta.env.VITE_ODDS_API_KEY;
            const sport = 'basketball_nba';
            try {
                const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sport}/events`, {
                    params: { apiKey, regions: 'us' },
                });
                const events = response.data.filter(event =>
                    event.home_team === selectedTeamName || event.away_team === selectedTeamName
                );
                const eventIds = events.map(event => event.id);
                setEventIds(eventIds);
            } catch (error) {
                console.error(error);
            }
        };

        if (selectedTeamName) {
            fetchEventsForTeam();
        }
    }, [selectedTeamName]);


    const handleTeamChange = (params) => {
        const { value } = params;
        if (value.length > 0) {
            setSelectedTeam(value[0].id);
            setTeamId(value[0].id)
            setSelectedTeamName(value[0].label)
        }
    };

    const handleSeasonChange = (params) => {
        const { value } = params;
        if (value.length > 0) {
            setSelectedSeason(value[0].id);
            setSeason(value[0].id)
        }
    };

    const handleGamesChange = (params) => {
        const { value } = params;
        if (value.length > 0) {
            setGamesInView(value[0].id);
        }
    };

    const seasonOptions = [
        { label: '2020', id: '2020' },
        { label: '2021', id: '2021' },
        { label: '2022', id: '2022' },
        { label: 'Current', id: '2023' },
    ];
    const selectedValue = seasonOptions.filter(option => option.id === selectedSeason);
    const selectedTeamValue = teamOptions.filter(option => option.id === selectedTeam);


    return (
        <Block className="parent" style={{ position: 'relative', zIndex: 0 }}>
            <Block className="left">
                <Block className="team__logo" $style={{ flexGrow: 1, marginLeft: `${marginLeft + 15}px` }}>
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
                                    zIndex: 1
                                }),
                            },
                            Root: {
                                style: ({ $theme }) => ({
                                    borderRadius: "0",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'visible',
                                    width: '120px',
                                    height: '120px',
                                    backgroundColor: avatarBackgroundColor,
                                }),
                            },
                        }}
                        name={team && team.name ? team.name : ""}
                        size="100px"
                        src={team && team.logo ? team.logo : ""}
                    />
                </Block>
            </Block>
            <Block className="backgroundWrapper" backgroundColor={primaryColor}>
                <Block className="middle">

                    <Block className="team">
                        <HeadingLevel>
                            <Heading styleLevel={1} marginTop="10px" color={secondaryColor} style={{ fontFamily: fontFamily }} >{selectedTeamName ? selectedTeamName : ""}</Heading>
                            <Heading marginTop="-5px" styleLevel={3} color={secondaryColor} style={{ fontFamily: fontFamily }}>{season ? season + `-${(Number(season) + 1).toString()}` : ""}</Heading>
                        </HeadingLevel>
                    </Block>
                    <Block className="teamLeaders">
                        <Block className="leadersHeading" style={{ justifyContent: "flex-start", alignItems: "flex-start", display: "flex", flexDirection: "row" }}>
                            <HeadingLevel >
                                <Heading styleLevel={4} color="white"
                                    style={{
                                        marginTop: "20px",
                                        paddingLeft: "85px",
                                        paddingRight: "86px",
                                        justifyContent: "flex-start",
                                        marginBottom: "-5px",
                                        backgroundColor: isHighlightedLeaders ? "#EA6607" : primaryColor,
                                        transition: 'background-color .85s ease-in-out',
                                        marginLeft: "512px",
                                        borderTopLeftRadius: "8px",
                                        borderTopRightRadius: "8px",
                                        borderBottomLeftRadius: "8px",
                                        borderBottomRightRadius: "8px"
                                    }}>Leaders</Heading>
                            </HeadingLevel>
                        </Block>
                        <TeamPlayerLeaderCard
                            teamId={teamId}
                            season={season}
                            category="points"
                            sendDataToParent={handleDataFromChild}
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                            games5={games5}
                            games10={games10}
                            games20={games20}
                            games50={games50}
                            gamesAll={gamesAll}
                        />
                    </Block>
                    <Block className="teamsItems" >
                        <TeamStatsComponent
                            teamId={teamId}
                            season={season}
                            isHighlightedSeason={isHighlightedSeason} />
                        <TeamScheduleComponent
                            teamId={teamId}
                            season={season}
                            gamesInView={gamesInView}
                            isHighlighted={isHighlighted}
                            onGames5Change={handleGames5Change}
                            onGames10Change={handleGames10Change}
                            onGames20Change={handleGames20Change}
                            onGames50Change={handleGames50Change}
                            onGamesAllChange={handleGamesAllChange}
                        />
                        <PlayerCardWrap
                            team={teamId}
                            season={season}
                            isSearchVisible={isSearchVisible}
                            setIsSearchVisible={setIsSearchVisible}
                            primaryColor={primaryColor}
                            secondaryColor={secondaryColor}
                            teamName={selectedTeamName}
                            games5={games5}
                            games10={games10}
                            games20={games20}
                            games50={games50}
                            gamesAll={gamesAll}
                        />
                    </Block>
                </Block>
                {eventIds ?
                    <Block key={0} className="odds" justifyContent="center" alignItems="center" display="flex" marginTop="50px">
                        <Block className="oddsl2" >
                            <GameOddsStandings eventId={eventIds[0]} teamName={selectedTeamName} />
                        </Block>
                    </Block>

                    :
                    <></>
                }
            </Block>
            <Block className="right">
                <Block className="Selector"
                    display="flex"
                    justifyContent="center"
                    marginBottom="70px"
                    $style={{ marginRight: `${marginLeft - 12}px` }}>
                    <Block marginRight="10px" paddingTop="10px">
                        <Select
                            options={teamOptions}
                            labelKey="label"
                            valueKey="id"
                            onChange={handleTeamChange}
                            value={[{ id: '0', label: 'Team' }]}
                            placeholder={<Block> &nbsp;&nbsp;&nbsp;Team&nbsp;&nbsp; </Block>}
                            clearable={false}
                            overrides={{
                                ControlContainer: {
                                    style: {
                                        minHeight: '35px', height: '35px', paddingLeft: '15px',
                                        paddingRight: '5px',
                                        borderRadius: "8px",
                                        cursor: 'default',
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
                    <Block marginRight="10px" paddingTop="10px">
                        <Select
                            options={[
                                { id: '2023', label: '2023-2024' },
                                { id: '2022', label: '2022-2023' },
                                { id: '2021', label: '2021-2022' },
                                { id: '2020', label: '2020-2021' },
                            ]}
                            labelKey="label"
                            valueKey="id"
                            onChange={handleSeasonChange}
                            value={[{ id: '0', label: 'Season' }]}
                            placeholder={<Block> &nbsp;&nbsp;Season&nbsp;&nbsp; </Block>}
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
                    <Block marginRight="10px" paddingTop="10px">
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
        </Block>
    );
}

export default TeamsPage;
