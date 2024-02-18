import React from "react";
import { Line } from "react-chartjs-2";
import Example from "./PlayerStatsTable";


function PlayerExample({ data, legend, options }) {
    return (
        <div>
            <div className="chart-container" style={{ minWidth: "700px" }}>
                <h2 style={{ textAlign: "center" }}>Mike Conley</h2>
                <Line data={data} legend={legend} options={options} />
                
            </div>
        </div>
    );
}
export default PlayerExample;