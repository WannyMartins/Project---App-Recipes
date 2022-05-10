import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { RecipesContext } from '../context/contexts';
import { fetchDrinksSearch } from '../services/apis';
import DrinkCard from './DrinkCard';
import styles from '../styles/Recipes.module.css';

function DrinksList() {
  const {
    searchThis,
    categoryDrinksButton,
    clickedDrinks,
    drinksList,
    setDrinksList,
  } = useContext(RecipesContext);

  const history = useHistory();
  const twelve = 12;

  useEffect(() => {
    try {
      const fetchDrinksTwelveRecipes = async () => {
        const data = await fetchDrinksSearch(searchThis);
        if (!data) {
          const alert = 'Sorry, we haven\'t found any recipes for these filters.';
          global.alert(alert);
        }
        if (data) {
          setDrinksList(data);
          if (data.length === 1) {
            const { idDrink } = data[0];
            history.push(`/drinks/${idDrink}`);
          }
        }
      };
      fetchDrinksTwelveRecipes();
    } catch (error) {
      console.error(error);
    }
  }, [history, searchThis, setDrinksList]);

  const renderFilter = (param) => param.filter((_drinks, indice) => indice < twelve)
    .map((drink, index) => (
      <DrinkCard
        key={ drink.idDrink }
        cardTestId={ `${index}-recipe-card` }
        titleTestId={ `${index}-card-name` }
        drink={ drink }
        index={ index }
      />
    ));

  return (
    <main className={ styles.container }>
      <section className={ `${styles.wrapper} ${styles.row}` }>
        {clickedDrinks
          ? (renderFilter(categoryDrinksButton))
          : (renderFilter(drinksList))}
      </section>
    </main>
  );
}

export default DrinksList;
