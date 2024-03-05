import React, { useState } from 'react';
import axios from 'axios';

const VITE_X_RAPIDAPI_KEY2 = import.meta.env.VITE_X_RAPIDAPI_KEY2;
const VITE_X_RAPIDAPI_HOST2 = import.meta.env.VITE_X_RAPIDAPI_HOST2;





const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('players'); // Default to players
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const options = {
            method: 'GET',
            url: `https://api-nba-v1.p.rapidapi.com/${searchType}`, // Use searchType in URL
            params: { search: query },
            headers: {
                'X-RapidAPI-Key': VITE_X_RAPIDAPI_KEY2,
                'X-RapidAPI-Host': VITE_X_RAPIDAPI_HOST2
            }
        };

        try {
            const response = await axios.request(options);
            setResults(response.data.response);
            console.log(response.data.response) 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for players or teams"
            />
            <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
                <option value="players">Players</option>
                <option value="teams">Teams</option>
            </select>
            <button onClick={handleSearch}>Search</button>
            <div>
    {results.length > 0 ? (
        results.map((item) => (
            <div key={item.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                {searchType === 'players' ? (
                    <>
                        
                        <h3>{item.firstname} {item.lastname}</h3>
                        
                    </>
                ) : (
                    <>
                        
                        <h3>{item.name}</h3>
                       
                        <img src={item.logo} alt={`${item.name} logo`} style={{ width: '50px', height: '50px' }} />
                    </>
                )}
            </div>
        ))
    ) : (
        <p>No results found</p>
    )}
</div>

        </div>
    );
};

export default SearchPage;
