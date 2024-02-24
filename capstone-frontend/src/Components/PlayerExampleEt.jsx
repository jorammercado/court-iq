import React from 'react';
import { Line } from 'react-chartjs-2';

const PlayerExample = ({ data, options, legend }) => {
    return (
        <div className="player-example">
            <Line data={data} options={options} legend={legend} />
        </div>
    );
};

export default PlayerExample;
