import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { RecipesContext } from '../context/contexts';
import { fetchDrinksSearch } from '../services/apis';
import DrinkCard from './DrinkCard';

function DrinksList() {
  const [drinksList, setDrinksList] = useState([]);

  const { searchThis } = useContext(RecipesContext);
  const history = useHistory();

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
  const twelve = 12;

  return (
    <section>
      {drinksList.filter((_drinks, indice) => indice < twelve)
        .map((drink, index) => (
          <DrinkCard
            key={ drink.idDrink }
            cardTestId={ `${index}-recipe-card` }
            titleTestId={ `${index}-card-name` }
            drink={ drink }
            index={ index }
          />
        ))}
    </section>
  );
}

export default DrinksList;
