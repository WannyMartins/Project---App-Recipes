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

        setDrinksList(data);

        if (data.length === 1) {
          const { idDrink } = data[0];
          history.push(`/drinks/${idDrink}`);
        }
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
            drink={ drink }
            index={ index }
          />
        ))}
    </section>
  );
}

export default DrinksList;
