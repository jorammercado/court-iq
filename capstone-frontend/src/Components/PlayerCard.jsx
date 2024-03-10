import React from 'react';

const PlayerCard = ({ player, stats }) => {

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', display: 'inline-block', width: '200px', textAlign: 'center' }}>
            <h4>{player.firstname} {player.lastname}</h4>
            {/* Display player's image if available */}
           
        
         
            {/* Add more player details here */}

            <p>Position: {player.position}</p>
            {/* You can add more details based on the data structure */}
        </div>
    );
};

export default PlayerCard;
