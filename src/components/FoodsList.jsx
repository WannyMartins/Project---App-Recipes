import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { RecipesContext } from '../context/contexts';
import { fetchMealsSearch } from '../services/apis';
import FoodCard from './FoodCard';

function FoodsList() {
  const { searchThis,
    categoryFoodsButton,
    clickedFoods,
    foodsList,
    setFoodsList,
    setClickedFoods,
  } = useContext(RecipesContext);
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
          setFoodsList(data);

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

  const renderFilter = (param) => param.filter((_meals, indice) => indice < twelve)
    .map((meal, index) => (
      <FoodCard
        key={ meal.idMeal }
        data-testid={ `${index}-recipe-card` }
        meal={ meal }
        index={ index }
      />
    ));

  return (
    <section>
      <button
        type="button"
        name="All"
        data-testid="All-category-filter"
        onClick={ () => setClickedFoods(false) }
      >
        All

      </button>

      {clickedFoods === true
        ? (renderFilter(categoryFoodsButton))
        : (renderFilter(foodsList))}
    </section>
  );
}

export default FoodsList;
