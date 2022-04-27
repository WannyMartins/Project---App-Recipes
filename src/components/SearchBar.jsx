import React, { useState } from 'react';

function SearchBar() {
  const [showBar, setShowBar] = useState(false);
  return (
    <>
      <button
        className="search-bar"
        type="button"
        onClick={ () => setShowBar((state) => !state) }
      >
        <img
          src="../images/searchIcon.svg"
          alt="search"
          data-testid="search-top-btn"
          width="30px"
        />
      </button>

      {
        showBar && (
          <nav>
            <input
              type="text"
              data-testid="search-input"
            />

            <div>
              <label htmlFor="hub1">
                <input
                  type="radio"
                  data-testid="ingredient-search-radio"
                  id="ingredient-search"
                  name="searchWith"
                  value="ingredient"
                />
                Ingredient
              </label>

              <label htmlFor="hub1">
                <input
                  type="radio"
                  data-testid="name-search-radio"
                  id="name-search"
                  name="searchWith"
                  value="name"
                />
                Name
              </label>

              <label htmlFor="hub1">
                <input
                  type="radio"
                  data-testid="first-letter-search-radio"
                  id="first-letter-search"
                  name="searchWith"
                  value="first-letter"
                />
                First Letter
              </label>

              <button
                type="button"
                data-testid="exec-search-btn"
              >
                Search
              </button>
            </div>
          </nav>
        )
      }
    </>
  );
}

export default SearchBar;
