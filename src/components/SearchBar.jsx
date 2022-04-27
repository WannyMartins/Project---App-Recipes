import React from 'react';
import { Link } from 'react-router-dom';

function SearchBar() {
  return (
    <>
      <div className="nav-bar">
        <Link to="/search" className="search-bar" href="link to searchBar">
          <img
            src="../images/profileIcon.svg"
            alt="profile"
            dataTestId="search-top-btn"
            width="30px"
          />
        </Link>
      </div>

      <div>
        <p />
      </div>
    </>
  );
}

export default SearchBar;
