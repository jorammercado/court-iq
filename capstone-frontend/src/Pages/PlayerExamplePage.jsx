import React from 'react';
import { useState } from "react";
import PlayerExample from '../Components/PlayerExample';
import { Data2 } from '../utils/Data2';
import Example from '../Components/PlayerStatsTable';

import "./PlayerExamplePage.scss"



const PlayerExamplePage = () => {
    const [data, setChartData] = useState({
        labels: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        datasets: [
            {
                label: "Points Per Game",
                lineTension: 0.4,
                data: [9.4, 10.9, 12, 13.7, 12.7, 14.6, 17.2, 15.8, 15.3, 20.5, 17.1, 21.1, 14.4, 16.2, 13.7, 14, 10.7, 11.9, 10.6],
                fill: true,
                backgroundColor: "rgba(142, 202, 230,0.2)",
                borderColor: "rgba(142, 202, 230,1)"
            },
            {
                label: "Turn Over Per Game",
                lineTension: 0.4,
                data: [1.7, 1.7, 2.1, 2.2, 2, 2.4, 2.1, 2.2, 1.5, 2.3, 1.5, 1.9, 2, 1.9, 1.7, 1.2, 1.7, 1.5, 1.1],
                fill: false,
                backgroundColor: "rgba(33, 158, 188,0.2)",
                borderColor: "rgba(33, 158, 188,1)"
            },
            {
                label: "Assists Per Game",
                lineTension: 0.4,
                data: [4.2, 4.3, 5.3, 6.5, 6.5, 6.1, 6, 5.4, 6.1, 6.3, 4.1, 6.4, 4.4, 6, 5.3, 5, 7.7, 6.7, 6.4],
                fill: true,
                backgroundColor: "rgba(2, 48, 71,0.2)",
                borderColor: "rgba(2, 48, 71,1)"
            },
            {
                label: "Offensive Rebounds Per Game",
                lineTension: 0.4,
                data: [
                    0.4,
                    0.3,
                    0.4,
                    0.4,
                    0.4,
                    0.5,
                    0.6,
                    0.4,
                    0.5,
                    0.4,
                    0,
                    0.6,
                    0.7,
                    0.7,
                    0.7,
                    0.7,
                    0.4,
                    0.5,
                    0.4
                ],
                fill: false,
                backgroundColor: "rgba(251, 133, 0,0.2)",
                borderColor: "rgba(251, 133, 0,1)"
            },
            {
                label: "Three Pointers Per Game",
                lineTension: 0.4,
                data: [
                    0.6,
                    1.1,
                    1,
                    1,
                    1,
                    1.3,
                    1.4,
                    1.5,
                    1.4,
                    2.5,
                    2,
                    2.2,
                    2,
                    2.7,
                    2.3,
                    2.4,
                    1.8,
                    2,
                    2.3
                ],
                fill: true,
                backgroundColor: "rgba(255, 183, 3,0.2)",
                borderColor: "rgba(255, 183, 3,1)"
            }
        ]
    });

    const legend = {
        display: true,
        position: "bottom",
        labels: {
            fontColor: "#323130",
            fontSize: 14
        }
    };

    const options = {
        responsive: true,
        title: {
            display: true,
            text: "Chart Title"
        },
        scales: {
            //   yAxes: [
            //     {
            //       ticks: {
            //         suggestedMin: 0,
            //         suggestedMax: 100
            //       }
            //     }
            //   ]
        }
    };


    return (

        <div className="playerexamplepage">

            <PlayerExample data={data} options={options} legend={legend} />
            <div className="baseTable">
                <Example data={data} />
            </div>

        </div>

    );
}

export default PlayerExamplePage;





