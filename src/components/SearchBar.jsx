import React from 'react';
import { Link } from 'react-router-dom';

function SearchBar() {
  return (
    <>
      <Link to="/search" className="search-bar" href="link to searchBar">
        <img
          src="../images/searchIcon.svg"
          alt="search"
          data-testid="search-top-btn"
          width="30px"
        />
      </Link>

      <div />
    </>
  );
}

export default SearchBar;
