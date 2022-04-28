import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/contexts';
import { fetchDrinksSearch } from '../services/apis';
import DrinkCard from './DrinkCard';

function DrinksList() {
  const [drinksList, setDrinksList] = useState([]);

  const { searchThis } = useContext(RecipesContext);

  useEffect(() => {
    try {
      const fetchDrinksTwelveRecipes = async () => {
        const data = await fetchDrinksSearch(searchThis);
        console.log(data);
        setDrinksList(data);
      };
      fetchDrinksTwelveRecipes();
    } catch (error) {
      console.error(error);
    }
  }, [searchThis]);
  const twelve = 12;

  return (
    <section>
      {drinksList.filter((drinks, indice) => indice < twelve)
        .map((drink, index) => (
          <DrinkCard
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
            drink={ drink }
            index={ index }
          />
        ))}
    </section>
  );
}

export default DrinksList;
