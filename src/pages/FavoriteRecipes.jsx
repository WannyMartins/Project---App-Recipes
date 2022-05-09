import React, { useState, useEffect } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import styles from '../styles/Recipes.module.css';

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
      <nav className={ styles.row }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
          name=""
          className={ styles.button }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClick }
          name="food"
          className={ styles.button }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClick }
          name="drink"
          className={ styles.button }
        >
          Drinks
        </button>
      </nav>
      <main className={ styles.container }>
        <section className={ styles.wrapper }>
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
      </main>
    </>
  );
}

export default FavoriteRecipes;
