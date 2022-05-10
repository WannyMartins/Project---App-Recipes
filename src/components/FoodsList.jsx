import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { RecipesContext } from '../context/contexts';
import { fetchMealsSearch } from '../services/apis';
import FoodCard from './FoodCard';
import styles from '../styles/Recipes.module.css';

function FoodsList() {
  const {
    searchThis,
    categoryFoodsButton,
    clickedFoods,
    foodsList,
    setFoodsList,
  } = useContext(RecipesContext);
  const history = useHistory();
  const twelve = 12;

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
  }, [history, searchThis, setFoodsList]);

  const renderFilter = (param) => param.filter((_meals, indice) => indice < twelve)
    .map((meal, index) => (
      <FoodCard
        key={ meal.idMeal }
        cardTestId={ `${index}-recipe-card` }
        titleTestId={ `${index}-card-name` }
        meal={ meal }
        index={ index }
      />
    ));

  return (
    <main className={ styles.container }>
      <section className={ `${styles.wrapper} ${styles.row}` }>
        {clickedFoods === true
          ? (renderFilter(categoryFoodsButton))
          : (renderFilter(foodsList))}
      </section>
    </main>
  );
}

export default FoodsList;
