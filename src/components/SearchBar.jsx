import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { RecipesContext } from '../context/contexts';
import searchIcon from '../images/searchIcon.svg';
import styles from '../styles/Header.module.css';

function SearchBar() {
  const [showBar, setShowBar] = useState(false);
  const [searchFor, setSearchFor] = useState({ search: '', input: '' });

  const { setSearchThis } = useContext(RecipesContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setSearchFor((state) => ({ ...state, [name]: value }));

    if (searchFor.search === 'first-letter' && searchFor.input.length >= 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleClickSearch = () => {
    setSearchThis(searchFor);
  };

  return (
    <>
      <button
        className={ styles.button }
        type="button"
        onClick={ () => setShowBar((state) => !state) }
      >
        <img
          src={ searchIcon }
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
              name="input"
              value={ searchFor.input }
              data-testid="search-input"
              onChange={ handleChange }
            />

            <div>
              <label htmlFor="ingredient-search">
                <input
                  type="radio"
                  data-testid="ingredient-search-radio"
                  id="ingredient-search"
                  name="search"
                  value="ingredient"
                  onClick={ handleChange }
                />
                Ingredient
              </label>

              <label htmlFor="name-search">
                <input
                  type="radio"
                  data-testid="name-search-radio"
                  id="name-search"
                  name="search"
                  value="name"
                  onClick={ handleChange }
                />
                Name
              </label>

              <label htmlFor="first-letter-search">
                <input
                  type="radio"
                  data-testid="first-letter-search-radio"
                  id="first-letter-search"
                  name="search"
                  value="first-letter"
                  onClick={ handleChange }
                />
                First Letter
              </label>

              <button
                type="button"
                data-testid="exec-search-btn"
                onClick={ handleClickSearch }
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

SearchBar.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default SearchBar;
