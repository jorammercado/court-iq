import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PLayerComparation.scss";
import images from "../constants/images";
import "animate.css";
import { Block } from "baseui/block";
import { Heading, HeadingLevel } from "baseui/heading";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import Chart from "chart.js/auto";
import { LabelMedium, LabelXLarge, LabelLarge } from "baseui/typography";
import { ParagraphSmall } from "baseui/typography";
import Spin from "../Components/SpinLoad";
import styled from "styled-components";

function PlayerComparison() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Data, setPlayer1Data] = useState(null);
  const [player2Data, setPlayer2Data] = useState(null);
  const [padding, setPadding] = useState(window.innerWidth / 100);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setPadding(
        window.innerWidth > 1400 ? (window.innerWidth - 1300) / 400 - 10 : 65
      );
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const PLAYER_URL = import.meta.env.VITE_PLAYER_URL;
  const PLAYER_HOST = import.meta.env.VITE_PLAYER_HOST;
  const PLAYER_API_KEY = import.meta.env.VITE_PLAYER_API_KEY;

  const handleSearch = async () => {
    try {
      const options1 = {
        method: "GET",
        url: PLAYER_URL,
        params: {
          playerName: player1,
          statsToGet: "averages",
        },
        headers: {
          "X-RapidAPI-Key": PLAYER_API_KEY,
          "X-RapidAPI-Host": PLAYER_HOST,
        },
      };

      const options2 = {
        method: "GET",
        url: PLAYER_URL,
        params: {
          playerName: player2,
          statsToGet: "averages",
        },
        headers: {
          "X-RapidAPI-Key": PLAYER_API_KEY,
          "X-RapidAPI-Host": PLAYER_HOST,
        },
      };

      const [response1, response2] = await Promise.all([
        axios.request(options1),
        axios.request(options2),
      ]);

      setPlayer1Data(response1.data.body[0]);
      setPlayer2Data(response2.data.body[0]);
      setPlayer1("");
      setPlayer2("");
    } catch (error) {
      console.error("Error searching for players:", error);
    }
  };

  useEffect(() => {
    if (player1Data && player2Data) {
      renderChart();
    }
  }, [player1Data, player2Data]);

  const renderChart = () => {
    const ctx = document.getElementById("comparisionChart").getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const player1DataSet = {
      label: player1Data.nbaComName,
      data: [
        player1Data.stats.gamesPlayed,
        player1Data.stats.pts,
        player1Data.stats.ast,
        player1Data.stats.reb,
        player1Data.stats.blk,
      ],
      backgroundColor: "#ea6607",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    };

    const player2DataSet = {
      label: player2Data.nbaComName,
      data: [
        player2Data.stats.gamesPlayed,
        player2Data.stats.pts,
        player2Data.stats.ast,
        player2Data.stats.reb,
        player2Data.stats.blk,
      ],
      backgroundColor: "white",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    };

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Games Played", "Points", "Assists", "Rebounds", "Blocks"],
        datasets: [player1DataSet, player2DataSet],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Court IQ Comparison'
          }
        }
      },
    });
  };

  useEffect(() => {
    if (player1Data && player2Data) {
      renderChart();
    }

    // clean up function to destroy the chart 
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [player1Data, player2Data]);


  const inputOverrides = {
    Root: {
      style: {
        borderRadius: "0",
        maxWidth: "350px",
      },
    },
    InputContainer: {
      style: {},
    },
  };
  const StyledButton = styled(Button)`
    border-radius: 0px;
    background-color: #ea6607;

    &:hover {
      color: white;
      background-color: #ea6607;
    }
  `;
  return (
    <Block
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      flexDirection="column"
      className="standings"
    >
      <Block
        className="subb__heading"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        flexDirection="row"
        backgroundColor="#EA6607"
        padding="0px"
        height="60px"
        marginBottom="30px"
      >
        <Block
          className="subHeading_contain"
          display="flex"
          justifyContent="left"
          alignItems="center"
          width="1270px"
          paddingLeft={padding - 5 + "px"}
        >
          <HeadingLevel>
            <Heading styleLevel={!isMobile ? 5 : 6} color="black">
              Compare Players
            </Heading>
          </HeadingLevel>
        </Block>
      </Block>
      <Block className="player-comparison-container">
        <Block
          className="comparison-instruction"
          style={{ maxWidth: "1270px" }}
        >
          <HeadingLevel>
            <Heading
              styleLevel={6}
              color="white"
              padding="15px"
              backgroundColor="black"
            >
              Welcome to our NBA player comparison tool! Enter the names of two
              NBA players below and click "Compare Players" to see their
              detailed statistics side by side.
            </Heading>
          </HeadingLevel>
        </Block>

        <Block
          className="player-inputs-container"
          $style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            margin: "auto",
          }}
        >
          <Block
            $style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "100%",
              maxWidth: "1270px",
              marginBottom: "5px",
              gap: "20px",
            }}
          >
            <Input
              className="player-input"
              type="text"
              placeholder="First Player"
              startEnhancer={"🏀"}
              value={player1}
              overrides={inputOverrides}
              onChange={(e) => setPlayer1(e.target.value)}
              $style={{ marginRight: "10px", flex: 1 }}
            />

            <Block
              className="comparison-heading-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                maxWidth: "42px",
              }}
            >
              <img
                src={images.vsBall}
                className="court-img animate__animated animate__fadeIn"
                alt=""
                style={{
                  height: "42px",
                  width: "42px",
                  margin: "0px",
                  padding: "0px",
                }}
              />
            </Block>

            <Input
              className="player-input"
              type="text"
              placeholder="Second Player"
              startEnhancer={"🏀"}
              value={player2}
              overrides={inputOverrides}
              onChange={(e) => setPlayer2(e.target.value)}
              $style={{ marginLeft: "10px", flex: 1 }}
            />
          </Block>

          <Block
            className="compare-button-container"
            $style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <StyledButton
              className="compare-button"
              onClick={handleSearch}
              $style={{ borderRadius: "0px", backgroundColor: "#ea6607" }}
            >
              Compare Players
            </StyledButton>
          </Block>
        </Block>
        <div className="player-cards-container">
          <div className="player-card">
            {player1Data && (
              <Block
                className="player-info animate__animated animate__backInLeft"
                style={{ backgroundColor: "#141414" }}
              >
                <img
                  style={{ backgroundColor: "#141414" }}
                  className="player-img"
                  src={player1Data.espnHeadshot}
                  alt=""
                />
                <Block className="info-card ">
                  <HeadingLevel>
                    <Heading styleLevel={4} color="white">
                      {player1Data.nbaComName}
                    </Heading>
                  </HeadingLevel>
                  <LabelLarge className="player-stat">
                    College : {player1Data.college}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    DOB : {player1Data.bDay}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Weight : {player1Data.weight}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Height : {player1Data.height}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Team : {player1Data.team}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Games PLayed : {player1Data.stats.gamesPlayed}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Rebounds : {player1Data.stats.reb}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Assist : {player1Data.stats.ast}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Effective Shooting %:{" "}
                    {player1Data.stats.effectiveShootingPercentage}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Shooting % : {player1Data.stats.trueShootingPercentage}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Points : {player1Data.stats.pts}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Blocks : {player1Data.stats.blk}
                  </LabelLarge>
                </Block>
              </Block>
            )}
          </div>

          <div className="player-card">
            {player2Data && (
              <Block
                className="player-info animate__animated animate__backInRight"
                style={{ backgroundColor: "#141414" }}
              >
                <img
                  style={{ backgroundColor: "#141414" }}
                  className="player-img"
                  src={player2Data.espnHeadshot}
                  alt=""
                />
                <Block className="info-card">
                  <HeadingLevel>
                    <Heading styleLevel={4} color="white">
                      {player2Data.nbaComName}
                    </Heading>
                  </HeadingLevel>
                  <LabelLarge className="player-stat">
                    College : {player2Data.college}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    DOB : {player2Data.bDay}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Weight : {player2Data.weight}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Height : {player2Data.height}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Team : {player2Data.team}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Games PLayed : {player2Data.stats.gamesPlayed}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Rebounds : {player2Data.stats.reb}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Assist : {player2Data.stats.ast}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Effective Shooting % :{" "}
                    {player2Data.stats.effectiveShootingPercentage}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Shooting % : {player2Data.stats.trueShootingPercentage}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Points : {player2Data.stats.pts}
                  </LabelLarge>
                  <LabelLarge className="player-stat">
                    Blocks : {player2Data.stats.blk}
                  </LabelLarge>
                </Block>
              </Block>
            )}
          </div>
        </div>
        <div className="chart-container">
          <canvas id="comparisionChart"></canvas>
        </div>
      </Block>
    </Block>
  );
}

export default PlayerComparison;

