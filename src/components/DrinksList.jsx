import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { RecipesContext } from '../context/contexts';
import { fetchDrinksSearch } from '../services/apis';
import DrinkCard from './DrinkCard';

function DrinksList() {
  const { searchThis,
    categoryDrinksButton,
    clickedDrinks,
    drinksList,
    setDrinksList,
    setClickedDrinks,
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
  }, [history, searchThis]);

  const renderFilter = (param) => param.filter((_drinks, indice) => indice < twelve)
    .map((drink, index) => (
      <DrinkCard
        key={ drink.idDrink }
        data-testid={ `${index}-recipe-card` }
        drink={ drink }
        index={ index }
      />
    ));

  return (
    <section>
      <button
        type="button"
        name="All"
        data-testid="All-category-filter"
        onClick={ () => setClickedDrinks(false) }
      >
        All

      </button>

      {clickedDrinks
        ? (renderFilter(categoryDrinksButton))
        : (renderFilter(drinksList))}
    </section>
  );
}

export default DrinksList;
