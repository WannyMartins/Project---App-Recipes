import React, { useState, useEffect } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [filterBy, setFilterBy] = useState('');

  const getFavoriteList = () => {
    const favList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favList);
  };

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    getFavoriteList();
  }, []);

  const handleClick = ({ target }) => {
    const { name } = target;
    setFilterBy(name);
  };

  return (
    <>
      <Header tittle="Favorite Recipes" />
      <nav>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
          name=""
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClick }
          name="food"
        >
          Foods
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClick }
          name="drink"
        >
          Drinks
        </button>
      </nav>

      <section>
        {
          favorites
            .filter((item) => item.type.includes(filterBy))
            .map((fav, index) => (
              <FavoriteCard
                fav={ fav }
                index={ index }
                key={ `${index}-favCard` }
                getFavoriteList={ getFavoriteList }
              />
            ))
        }
      </section>
    </>
  );
}

export default FavoriteRecipes;
