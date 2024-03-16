import React, { useEffect, useState } from 'react';
import TeamStatsComponent from '../Components/TeamStatsComponent';
import PlayerStatsComponent from '../Components/PlayerStatsE'
import TeamScheduleComponent from '../Components/TeamScheduleComponent';
import TeamPlayerLeaderCard from '../Components/TeamPlayerLeaderCard';
import "./TeamsPage.scss"

const TeamsPage = () => {
    const [teamId, setTeamId] = useState('1');
    const [season, setSeason] = useState('2023');

    const handleTeamChange = (e) => {
        setTeamId(e.target.value);
    };

    const handleSeasonChange = (e) => {
        setSeason(e.target.value);
    };
    return (
        <div>
            <div className="Selector">
            <div>
                <label htmlFor="teamSelect">Select Team:</label>
                <select id="teamSelect" value={teamId} onChange={handleTeamChange}>
                    <option value="1">Atlanta Hawks</option>
                    <option value="2">Boston Celtics</option>
                    <option value="4">Brooklyn Nets</option>
                    <option value="5">Charlotte Hornets</option>
                    <option value="6">Chicago Bulls</option>
                    <option value="7">Cleveland Cavaliers</option>
                    <option value="8">Dallas Mavericks</option>
                    <option value="9">Denver Nuggets</option>
                    <option value="10">Detroit Pistons</option>
                    <option value="11">Golden State Warriors</option>
                    <option value="14">Houston Rockets</option>
                    <option value="15">Indiana Pacers</option>
                    <option value="16">LA Clippers</option>
                    <option value="17">Los Angeles Lakers</option>
                    <option value="19">Memphis Grizzlies</option>
                    <option value="20">Miami Heat</option>
                    <option value="21">Milwaukee Bucks</option>
                    <option value="22">Minnesota Timberwolves</option>
                    <option value="23">New Orleans Pelicans</option>
                    <option value="24">New York Knicks</option>
                    <option value="25">Oklahoma City Thunder</option>
                    <option value="26">Orlando Magic</option>
                    <option value="27">Philadelphia 76ers</option>
                    <option value="28">Phoenix Suns</option>
                    <option value="29">Portland Trail Blazers</option>
                    <option value="30">Sacramento Kings</option>
                    <option value="31">San Antonio Spurs</option>
                    <option value="38">Toronto Raptors</option>
                    <option value="40">Utah Jazz</option>
                    <option value="41">Washington Wizards</option>
                </select>
            </div>
            <div>
                <label htmlFor="seasonSelect">Select Season:</label>
                <select id="seasonSelect" value={season} onChange={handleSeasonChange}>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>

                </select>
            </div>
            <div className="teamLeaders">
    <h2>Team Leaders</h2>
    <TeamPlayerLeaderCard teamId={teamId} season={season} category="points" />
</div>
            </div>
            <TeamScheduleComponent teamId={teamId} season={season}/>
            <TeamStatsComponent teamId={teamId} season={season}/>
            <PlayerStatsComponent team={teamId} season={season}/>

        </div>
    );
}

export default TeamsPage;
