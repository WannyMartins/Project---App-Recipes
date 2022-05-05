import React, { useEffect } from 'react';
import ButtonsFiltersFoods from '../../components/ButtonsFiltersFoods';
import FoodsList from '../../components/FoodsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import styles from '../../styles/Recipes.module.css';

function Foods() {
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) localStorage.setItem('user', JSON.stringify({ email: '' }));
  }, []);

  return (
    <>
      <Header tittle="Foods">
        <SearchBar />
        <div className={ styles.row }>
          <ButtonsFiltersFoods />
          <button
            type="button"
            name="All"
            data-testid="All-category-filter"
            onClick={ () => setClickedFoods(false) }
            className={ styles.button }
          >
            All
          </button>
        </div>
      </Header>
      <FoodsList />
      <Footer />
    </>
  );
}

export default Foods;
