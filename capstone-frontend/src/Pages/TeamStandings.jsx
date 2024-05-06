import { React as React2, useEffect, useState } from 'react';
import axios from 'axios';
import * as React from "react";
import {
  TableBuilder,
  TableBuilderColumn,
} from 'baseui/table-semantic';
import { StyledLink as Link } from 'baseui/link';
import { Avatar } from 'baseui/avatar';
import { useStyletron } from 'baseui';
import { ArrowUp, ArrowDown } from 'baseui/icon';
import Spin from '../Components/SpinLoad';
import "./TeamStandings.scss"
import TopScoringTeamCard from '../Components/TopScoringTeamCard';
import TopDefensiveTeamCard from '../Components/TopDefensiveTeamCard';
import GameOdds from '../Components/GameOdds';
import "animate.css";
import {
  HeadingMedium,
} from "baseui/typography";
import { Block } from "baseui/block";
import { Heading, HeadingLevel } from 'baseui/heading';

const VITE_X_RAPIDAPI_KEY = import.meta.env.VITE_X_RAPIDAPI_KEY;
const VITE_X_RAPIDAPI_HOST = import.meta.env.VITE_X_RAPIDAPI_HOST;
const VITE_X_RAPIDAPI_URL = import.meta.env.VITE_X_RAPIDAPI_URL;


const options = {
  method: 'GET',
  url: VITE_X_RAPIDAPI_URL,
  params: {
    league: '12',
    season: '2023-2024'
  },
  headers: {
    'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY,
    'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST
  }
};


const TeamStandingsV2 = () => {
  const [data, setData] = useState([]);
  const [season, setSeason] = useState("");
  const [stage, setStage] = useState("");
  const [logo, setLogo] = useState("");
  const [westernConference, setWesternConference] = useState([]);
  const [easternConference, setEasternConference] = useState([]);
  const [easternTopScoringTeam, setEasternTopScoringTeam] = useState({});
  const [westernTopScoringTeam, setWesternTopScoringTeam] = useState({});
  const [easternTopDefensiveTeam, setEasternTopDefensiveTeam] = useState({});
  const [westernTopDefensiveTeam, setWesternTopDefensiveTeam] = useState({});
  const [padding, setPadding] = useState(window.innerWidth / 100);

  useEffect(() => {
    const handleResize = () => {
      setPadding(window.innerWidth > 1400 ? ((window.innerWidth - 1300) / 400) - 10 : 65);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.request(options);
        const responseData = response.data.response[0];
        // console.log(responseData)
        setData(responseData);
        const easternTeams = responseData.filter(e => e.group.name === "Eastern Conference");
        const westernTeams = responseData.filter(e => e.group.name === "Western Conference");
        setEasternConference(easternTeams);
        setWesternConference(westernTeams);
        setSeason(responseData[0].league.season);
        setStage(responseData[0].stage);
        setLogo(responseData[0].league.logo);

        // Top scoring teams logic
        setEasternTopScoringTeam(easternTeams[0]?.team);
        setWesternTopScoringTeam(westernTeams[0]?.team);

        // Top defensive teams logic
        const easternDefensiveTeam = easternTeams.reduce((prev, current) => (prev.points.against < current.points.against) ? prev : current, easternTeams[0]).team;
        const westernDefensiveTeam = westernTeams.reduce((prev, current) => (prev.points.against < current.points.against) ? prev : current, westernTeams[0]).team;

        setEasternTopDefensiveTeam(easternDefensiveTeam);
        setWesternTopDefensiveTeam(westernDefensiveTeam);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);




  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const teamsWestern = westernConference.map(team => {
    return {
      position: team.position,
      avatarSrc: team.team.logo,
      name: team.team.name,
      title: team.group.name,
      gamesLost: team.games.lose.total,
      gamesLostPercentage: team.games.lose.percentage,
      gamesWon: team.games.win.total,
      gamesWonPercentage: team.games.win.percentage,
      pointsAgainst: team.points.against,
      pointsFor: team.points.for,
    };
  });

  const teamsEastern = easternConference.map(team => {
    return {
      position: team.position,
      avatarSrc: team.team.logo,
      name: team.team.name,
      title: team.group.name,
      gamesLost: team.games.lose.total,
      gamesLostPercentage: team.games.lose.percentage,
      gamesWon: team.games.win.total,
      gamesWonPercentage: team.games.win.percentage,
      pointsAgainst: team.points.against,
      pointsFor: team.points.for,
    };
  });

  const DATA2 = teamsEastern.map((team, index) => {
    return {
      id: index,
      position: team.position,
      avatarSrc: team.avatarSrc,
      name: team.name,
      title: team.title,
      gamesLost: team.gamesLost,
      gamesLostPercentage: team.gamesLostPercentage,
      gamesWon: team.gamesWon,
      gamesWonPercentage: team.gamesWonPercentage,
      pointsAgainst: team.pointsAgainst,
      pointsFor: team.pointsFor,
    };
  });

  const DATA = teamsWestern.map((team, index) => {
    return {
      id: index,
      position: team.position,
      avatarSrc: team.avatarSrc,
      name: team.name,
      title: team.title,
      gamesLost: team.gamesLost,
      gamesLostPercentage: team.gamesLostPercentage,
      gamesWon: team.gamesWon,
      gamesWonPercentage: team.gamesWonPercentage,
      pointsAgainst: team.pointsAgainst,
      pointsFor: team.pointsFor,
    };
  });

  const teamData = {
    eastern: easternConference.map(team => ({
      name: team.team.name,
      logo: team.team.logo
    })),
    western: westernConference.map(team => ({
      name: team.team.name,
      logo: team.team.logo
    }))
  };

  function AvatarCell({
    src,
    title,
    subtitle,
  }) {
    const [css, theme] = useStyletron();
    return (
      <div className={css({ display: 'flex', alignItems: 'center' })}>
        <Avatar name={title} size="48px" src={src} />
        <div
          className={css({
            paddingLeft: theme.sizing.scale550,
            whiteSpace: 'nowrap',
          })}
        >
          <p
            className={css({
              ...theme.typography.LabelSmall,
              margin: 0,
            })}
          >
            {title}
          </p>
          <p
            className={css({
              ...theme.typography.ParagraphSmall,
              marginBottom: 0,
              marginTop: '4px',
            })}
          >
            {subtitle}
          </p>
        </div>
      </div>
    );
  }

  function NumberCell({
    value,
    delta,
    isPercentage = false,
  }) {
    const [css, theme] = useStyletron();
    let arrowIcon = null;
    let textColor = 'inherit';

    if (isPercentage) {
      const positive = delta > 0;
      const arrowColor = positive ? 'green' : 'red';
      textColor = delta === 0 ? 'inherit' : arrowColor;
      arrowIcon = delta === 0.5 ? null : positive ? <ArrowUp /> : <ArrowDown />;
    }

    return (
      <div className={css({ display: 'flex', alignItems: 'center' })}>
        <span
          className={css({
            ...theme.typography.MonoParagraphSmall,
            color: textColor,
          })}
        >
          {value}
        </span>
        {arrowIcon && (
          <div
            className={css({
              alignItems: 'center',
              display: 'flex',
              paddingLeft: theme.sizing.scale300,
              color: textColor,
            })}
          >
            {arrowIcon}
          </div>
        )}
      </div>
    );
  }

  return (
    <Block display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column" className="standings">
      <Block className="subb__heading" display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        flexDirection="row"
        backgroundColor="#EA6607"
        padding="0px"
        height="60px"
        marginBottom="10px" >
        <Block className="subHeading_contain" display="flex" justifyContent="left" alignItems="center" width="1270px" paddingLeft={padding + "px"}>
          <Link href="https://www.nba.com/" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="NBA Logo" style={{ height: "20px", backgroundColor: "#faf7f2", cursor: "pointer", marginBottom: "7px" }} />
          </Link>
          <HeadingLevel>
            <Heading styleLevel={!isMobile ? 5 : 6} color="black" >{stage} {season}</Heading>
          </HeadingLevel>
        </Block>
      </Block>
      <Block display="flex" justifyContent="center" alignItems="center" flexDirection="row">
        {!isMobile ?
          <Block
            flexDirection="column"
            justifyContent="space-between"
            className="west-leaders"
            marginTop="-28px"
            paddingLeft="10px"
            paddingRight="10px"
          >
            <Block>
              <TopScoringTeamCard
                logo={westernTopScoringTeam.logo}
                name={westernTopScoringTeam.name}
                conference="Western"
              />
            </Block>
            <Block>
              {/* Replace this block with the TopDefensiveTeamCard for Western Conference */}
              <TopDefensiveTeamCard
                logo={westernTopDefensiveTeam.logo}
                name={westernTopDefensiveTeam.name}
                conference="Western"
              />
            </Block>

          </Block>
          : <></>
        }

        {/* Main content block */}
        <Block display="flex"
          flexDirection="column"
          justifyContent="space-between"
          className="table__contain"
          height="100%"
          maxWidth={isMobile ? "85%" : "850px"}
          style={{ width: isMobile ? '100%' : 'unset' }}
        >
          {data == null || data === undefined || data.length === 0 || !data ? <Spin></Spin> :
            <Block display="flex" justifyContent="left" backgroundColor="black" width="100%" marginTop="5px"
              $style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} >
              <HeadingMedium marginLeft="5px" color="white" >Western Conference</HeadingMedium>
            </Block>
          }
          {data == null || data === undefined || data.length === 0 || !data ? <Spin></Spin> :
            <TableBuilder className="table1"
              overrides={{ Root: { style: { maxHeight: '300px', marginBottom: "10px" } } }}
              data={DATA}
            >
              <TableBuilderColumn header="Team">
                {(row) => (
                  <AvatarCell
                    src={row.avatarSrc}
                    title={row.name}
                    subtitle={row.title}
                  />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Position">
                {(row) => (
                  <NumberCell value={row.position} delta={0.51} />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Games Lost">
                {(row) => (
                  <NumberCell value={row.gamesLost} delta={-0.51} />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Games Lost %">
                {(row) => (
                  <NumberCell value={row.gamesLostPercentage} delta={row.gamesLostPercentage - 0.5} isPercentage />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Games Won">
                {(row) => (
                  <NumberCell value={row.gamesWon} delta={0.51} />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Games Won %">
                {(row) => (
                  <NumberCell value={row.gamesWonPercentage} delta={row.gamesWonPercentage - 0.5} isPercentage />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Points Against">
                {(row) => (
                  <NumberCell value={row.pointsAgainst} delta={0.51} />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Points For">
                {(row) => (
                  <NumberCell value={row.pointsFor} delta={0.51} />
                )}
              </TableBuilderColumn>
            </TableBuilder>
          }
          {data == null || data === undefined || data.length === 0 || !data ? <Spin></Spin> :
            <Block display="flex" justifyContent="left" backgroundColor="black" width="100%"
              $style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
              <HeadingMedium marginLeft="5px" color="white" >Eastern Conference</HeadingMedium>
            </Block>
          }
          {data == null || data === undefined || data.length === 0 || !data ? <Spin></Spin> :
            <TableBuilder className="table2"
              overrides={{ Root: { style: { maxHeight: '300px', marginBottom: "-16px" } } }}
              data={DATA2}
            >
              <TableBuilderColumn header="Team">
                {(row) => (
                  <AvatarCell
                    src={row.avatarSrc}
                    title={row.name}
                    subtitle={row.title}
                  />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Position">
                {(row) => (
                  <NumberCell value={row.position} delta={0.51} />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Games Lost">
                {(row) => (
                  <NumberCell value={row.gamesLost} delta={-0.51} />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Games Lost %">
                {(row) => (
                  <NumberCell value={row.gamesLostPercentage} delta={row.gamesLostPercentage - 0.5} isPercentage />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Games Won">
                {(row) => (
                  <NumberCell value={row.gamesWon} delta={0.51} />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Games Won %">
                {(row) => (
                  <NumberCell value={row.gamesWonPercentage} delta={row.gamesWonPercentage - 0.5} isPercentage />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Points Against">
                {(row) => (
                  <NumberCell value={row.pointsAgainst} delta={0.51} />
                )}
              </TableBuilderColumn>

              <TableBuilderColumn header="Points For">
                {(row) => (
                  <NumberCell value={row.pointsFor} delta={0.51} />
                )}
              </TableBuilderColumn>
            </TableBuilder>
          }
        </Block>

        {!isMobile ?
          <Block
            flexDirection="column"
            justifyContent="space-between"
            className="east-leaders"
            marginTop="-28px"
            paddingLeft="10px"
            paddingRight="10px"
          >
            <Block>
              <TopScoringTeamCard
                logo={easternTopScoringTeam.logo}
                name={easternTopScoringTeam.name}
                conference="Eastern"
              />
            </Block>
            <Block>
              {/* Replace this block with the TopDefensiveTeamCard for Eastern Conference */}
              <TopDefensiveTeamCard
                logo={easternTopDefensiveTeam.logo}
                name={easternTopDefensiveTeam.name}
                conference="Eastern"
              />
            </Block>

          </Block>
          : <></>
        }
      </Block>
      <Block className="leadersHeading" style={{ justifyContent: "center", alignItems: "center", display: "flex", marginTop: "25px" }}>
        <HeadingLevel >
          <Heading className="heading" styleLevel={4} color="white" style={{ display: "flex", paddingTop: "5px", marginTop: "15px", justifyContent: "center", alignItems: "center", marginBottom: "-15px", backgroundColor: "black", paddingBottom: "1px",
        borderTopLeftRadius:"8px", borderTopRightRadius:"8px" }}>NBA h2h Ventures</Heading>
        </HeadingLevel>
      </Block>
      <Block className="oddsT" justifyContent="center" alignItems="center" display="flex" marginTop="10px">
        <Block className="odds__l2T" backgroundColor="black" style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginBottom: "100px",
          borderBottomLeftRadius:"8px", borderBottomRightRadius:"8px" 
        }}>
          <GameOdds teamData={teamData} />
        </Block>
      </Block>
    </Block>
  );
}

export default TeamStandingsV2;