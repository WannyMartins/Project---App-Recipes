import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { RecipesContext } from '../context/contexts';
import { fetchMealsSearch } from '../services/apis';
import FoodCard from './FoodCard';

function FoodsList() {
  const [mealsList, setMealsList] = useState([]);

  const { searchThis } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    try {
      const fetchMealsTwelveRecipes = async () => {
        const data = await fetchMealsSearch(searchThis);

        if (!data) {
          const alert = 'Sorry, we haven\'t found any recipes for these filters.';
          global.alert(alert);
        }

        if (data) {
          setMealsList(data);

          if (data.length === 1) {
            const { idMeal } = data[0];
            history.push(`/foods/${idMeal}`);
          }
        }
      };
      fetchMealsTwelveRecipes();
    } catch (error) {
      console.error(error);
    }
  }, [history, searchThis]);
  const twelve = 12;

  return (
    <section>
      {mealsList.filter((_meals, indice) => indice < twelve)
        .map((meal, index) => (
          <FoodCard
            key={ meal.idMeal }
            testId={ `${index}-recipe-card` }
            meal={ meal }
            index={ index }
          />
        ))}
    </section>
  );
}

export default FoodsList;
