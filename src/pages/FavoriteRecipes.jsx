import React, { useState, useEffect } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    const favList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favList);
  }, []);

  return (
    <>
      <Header tittle="Favorite Recipes" />
      <nav>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          // onClick={}
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          // onClick={}
        >
          Foods
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          // onClick={}
        >
          Drinks
        </button>
      </nav>

      <section>
        {
          favorites.map((fav, index) => (
            <FavoriteCard
              fav={ fav }
              index={ index }
              key={ `${index}-favCard` }
            />
          ))
        }
      </section>
    </>
  );
}

export default FavoriteRecipes;
