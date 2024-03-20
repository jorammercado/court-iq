import React, { useEffect, useState } from 'react';
import TeamStatsComponent from '../Components/TeamStatsComponent';
import PlayerStatsComponent from '../Components/PlayerStatsE'
import TeamScheduleComponent from '../Components/TeamScheduleComponent';
import TeamPlayerLeaderCard from '../Components/TeamPlayerLeaderCard';
import TeamStatsGlossary from '../Components/TeamStatsGlossary';
import "./TeamsPage.scss"
import { Block } from "baseui/block";
import {
    LabelLarge,
    LabelMedium,
    LabelXSmall,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall
} from "baseui/typography";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Select } from 'baseui/select';
import { Avatar } from "baseui/avatar";

const TeamsPage = ({ isSearchVisible, setIsSearchVisible }) => {

    const handleDataFromChild = (data) => {
        setTeam(data.team)
    };

    const [team, setTeam] = useState({})
    const [teamId, setTeamId] = useState('1');
    const [season, setSeason] = useState('2023');
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedTeamName, setSelectedTeamName] = useState("Atlanta Hawks");

    const handleTeamChange = (params) => {
        const { value } = params;
        console.log(value)
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
    const seasonOptions = [
        { label: '2020', id: '2020' },
        { label: '2021', id: '2021' },
        { label: '2022', id: '2022' },
        { label: 'Current', id: '2023' },
    ];
    const selectedValue = seasonOptions.filter(option => option.id === selectedSeason);

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
    const selectedTeamValue = teamOptions.filter(option => option.id === selectedTeam);


    return (
        <Block className="parent">
            <Block className="left">
                <Block className="team__logo" $style={{ flexGrow: 1, marginRight: "100px" }}>
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
                                    width: '120px',
                                    height: '120px',
                                }),
                            },
                        }}
                        name={team && team.name ? team.name : ""}
                        size="100px"
                        src={team && team.logo ? team.logo : ""}
                    />
                </Block>
            </Block>
            <Block className="backgroundWrapper" backgroundColor="#ED751C">
                <Block className="middle">
                    <Block className="Selector" display="flex" justifyContent="space-between">
                        <Block marginRight="5px" paddingTop="10px">
                            <Select
                                options={teamOptions}
                                labelKey="label"
                                valueKey="id"
                                onChange={handleTeamChange}
                                value={<Block>&nbsp;&nbsp;&nbsp;Team&nbsp;&nbsp;; </Block>}
                                placeholder={<Block> &nbsp;&nbsp;&nbsp;Team&nbsp;&nbsp; </Block>}
                                clearable={false}
                                overrides={{
                                    ControlContainer: { style: { minHeight: '35px', height: '35px' } },
                                    ValueContainer: { style: { minHeight: '30px', height: '30px', padding: '0px' } },
                                    Placeholder: { style: { lineHeight: '30px' } },
                                    SingleValue: { style: { lineHeight: '30px' } },
                                }}

                            />
                        </Block>
                        <Block paddingTop="10px">
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
                                value={<Block> &nbsp;&nbsp;Team&nbsp;&nbsp; </Block>}
                                placeholder={<Block> &nbsp;&nbsp;Season&nbsp;&nbsp; </Block>}
                                clearable={false}
                                overrides={{
                                    ControlContainer: { style: { minHeight: '35px', height: '35px' } },
                                    ValueContainer: { style: { minHeight: '30px', height: '30px', padding: '0px' } },
                                    Placeholder: { style: { lineHeight: '30px' } },
                                    SingleValue: { style: { lineHeight: '30px' } },
                                }}

                            />
                        </Block>

                    </Block>
                    <Block className="team">
                        <HeadingLevel>
                            <Heading styleLevel={1} color="black">{selectedTeamName ? selectedTeamName : ""}</Heading>
                            <Heading marginTop="-20px" styleLevel={3} color="black">{season ? season + `-${(Number(season) + 1).toString()}` : ""}</Heading>
                        </HeadingLevel>
                    </Block>
                    <Block className="teamLeaders">
                        <HeadingLevel>
                            <Heading styleLevel={6} color="black">Team Leader(s)</Heading>
                        </HeadingLevel>
                        <TeamPlayerLeaderCard
                            teamId={teamId}
                            season={season}
                            category="points"
                            isSearchVisible={isSearchVisible}
                            setIsSearchVisible={setIsSearchVisible}
                            sendDataToParent={handleDataFromChild}
                        />
                    </Block>
                    <Block className="teamsItems">
                        <TeamScheduleComponent teamId={teamId} season={season} />
                        <TeamStatsComponent teamId={teamId} season={season} />
                        <PlayerStatsComponent
                            team={teamId}
                            season={season}
                            isSearchVisible={isSearchVisible}
                            setIsSearchVisible={setIsSearchVisible}
                        />
                        <TeamStatsGlossary />
                    </Block>
                </Block>
            </Block>
            <Block className="right">

            </Block>
        </Block>
    );
}

export default TeamsPage;
