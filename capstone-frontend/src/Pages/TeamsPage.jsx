import React, { useEffect, useState } from 'react';
import TeamStatsComponent from '../Components/TeamStatsComponent';
import PlayerStatsComponent from '../Components/PlayerStatsE'
import TeamScheduleComponent from '../Components/TeamScheduleComponent';
import TeamPlayerLeaderCard from '../Components/TeamPlayerLeaderCard';
import TeamStatsGlossary from '../Components/TeamStatsGlossary';
import "./TeamsPage.scss"
import { Block } from "baseui/block";
import {
    LabelMedium,
    LabelXSmall,
    HeadingLarge,
    HeadingMedium,
    HeadingSmall
} from "baseui/typography";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Select } from 'baseui/select';

const TeamsPage = () => {
    const [teamId, setTeamId] = useState('1');
    const [season, setSeason] = useState('2023');
    const [selectedTeam, setSelectedTeam] = useState("Atlanta Hawks");

    const handleTeamChange = (params) => {
        const { value } = params;
        console.log(value)
        if (value.length > 0) {
            setSelectedTeam(value[0].id);
            setTeamId(value[0].id)
        }
    };

    const handleSeasonChange = (e) => {
        setSeason(e.target.value);
    };

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
        <div>
            <Block className="Selector">
                <Block>
                    <Select
                        options={teamOptions}
                        labelKey="label"
                        valueKey="id"
                        onChange={handleTeamChange}
                        value={selectedTeamValue}
                        placeholder={<Block> &nbsp;Select Team&nbsp; </Block>}
                        clearable={false}
                    />
                </Block>
                <Block>
                    <label htmlFor="seasonSelect">Select Season:</label>
                    <select id="seasonSelect" value={season} onChange={handleSeasonChange}>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>

                    </select>
                </Block>
                <div className="teamLeaders">
                    <h2>Team Leaders</h2>
                    <TeamPlayerLeaderCard teamId={teamId} season={season} category="points" />
                </div>
            </Block>
            <TeamScheduleComponent teamId={teamId} season={season} />
            <TeamStatsComponent teamId={teamId} season={season} />
            <PlayerStatsComponent team={teamId} season={season} />
            <TeamStatsGlossary />
        </div>
    );
}

export default TeamsPage;
