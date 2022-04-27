import React from 'react';

function SearchBar() {
  return (
    <>
      <button className="search-bar" type="button">
        <img
          src="../images/searchIcon.svg"
          alt="search"
          data-testid="search-top-btn"
          width="30px"
        />
      </button>

      <div />
    </>
  );
}

export default SearchBar;
