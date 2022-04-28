import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/contexts';
import { fetchMealsSearch } from '../services/apis';
import FoodCard from './FoodCard';

function FoodsList() {
  const [mealsList, setMealsList] = useState([]);

  const { searchThis } = useContext(RecipesContext);

  useEffect(() => {
    console.log(searchThis);
    try {
      const fetchMealsTwelveRecipes = async () => {
        const data = await fetchMealsSearch(searchThis);
        setMealsList(data);
        console.log(data);
      };
      fetchMealsTwelveRecipes();
    } catch (error) {
      console.error(error);
    }
  }, [searchThis]);
  const twelve = 12;

  return (
    <section>
      {mealsList.filter((_meals, indice) => indice < twelve)
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
