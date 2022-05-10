import React, { useContext, useEffect } from 'react';
import ButtonsFiltersDrinks from '../../components/ButtonsFiltersDrinks';
import DrinksList from '../../components/DrinksList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import styles from '../../styles/Recipes.module.css';
import { RecipesContext } from '../../context/contexts';

function Drinks() {
  const { setClickedDrinks } = useContext(RecipesContext);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) localStorage.setItem('user', JSON.stringify({ email: '' }));
  }, []);

  return (
    <>
      <Header tittle="Drinks">
        <SearchBar />
      </Header>
      <div className={ styles.row }>
        <ButtonsFiltersDrinks />
        <button
          type="button"
          name="All"
          data-testid="All-category-filter"
          onClick={ () => setClickedDrinks(false) }
          className={ styles.button }
        >
          All
        </button>
      </div>
      <DrinksList />
      <Footer />
    </>
  );
}

export default Drinks;
