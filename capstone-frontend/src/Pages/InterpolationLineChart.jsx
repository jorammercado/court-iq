import React from 'react';
import { useState } from "react";
import LineChart from '../Components/LineChart';
import { Data2 } from '../utils/Data2';

import "./MyChartPage.scss"



const InterpolationLineChart = () => {
  const [data, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug"],
    datasets: [
        {
            label: "First dataset",
            lineTension: 0.4,
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Second dataset",
            lineTension: 0.4,
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#742774"
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

    <div className="piechart">
        <LineChart data={data} options={options} legend={legend}/>
    </div>

  );
}

export default InterpolationLineChart;





