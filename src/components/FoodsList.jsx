import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/contexts';
import { fetchMealsSearch } from '../services/apis';
import FoodCard from './FoodCard';

function FoodsList() {
  const [mealsList, setMealsList] = useState([]);

  const { searchThis } = useContext(RecipesContext);

  useEffect(() => {
    try {
      const fetchMealsTwelveRecipes = async () => {
        const data = await fetchMealsSearch(searchThis);
        setMealsList(data);
      };
      fetchMealsTwelveRecipes();
    } catch (error) {
      console.error(error);
    }
  }, [searchThis]);
  const twelve = 12;

  return (
    <section>
      {mealsList.filter((meals, indice) => indice < twelve)
        .map((meal, index) => (
          <FoodCard
            key={ meal.idMeal }
            data-testid={ `${index}-recipe-card` }
            meal={ meal }
            index={ index }
          />
        ))}
    </section>
  );
}

export default FoodsList;
