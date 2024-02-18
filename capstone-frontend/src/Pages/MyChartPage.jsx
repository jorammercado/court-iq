import React from 'react';
import { useState } from "react";
import PieChart from '../Components/PieChart';
import { Data } from '../utils/Data';

import "./MyChartPage.scss"



const MyChartPage = () => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          '#01161e',
          '#124559',
          '#598392',
          '#aec3b0',
          '#eff6e0'
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  return (

    <div className="piechart">
        <PieChart chartData={chartData} />
    </div>

  );
}

export default MyChartPage;







