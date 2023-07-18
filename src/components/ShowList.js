import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ShowList.css';
import { FaSearch } from 'react-icons/fa'; // Import the search icon


const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('https://api.tvmaze.com/shows');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchShows();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
      const data = await response.json();
      setShows(data.map(item => item.show));
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="show-list">
      <h1 className="header">TV SHOWS</h1>
    <div className="show-list-container">
      <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-box">
             <FaSearch className="search-icon" /> {/* Add the search icon here */}
             <input type="text" placeholder="Search..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
            <button type="submit">Search</button>
           </div>
      </form>
      <div className="shows-list">
        {shows.map(show => (
          <div className="show-card" key={show.id}>
            <img src={show.image?.medium} alt={show.name} />
            <h2>{show.name}</h2>
            <Link to={`/summary/${show.id}`}>View Summary</Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ShowList;
