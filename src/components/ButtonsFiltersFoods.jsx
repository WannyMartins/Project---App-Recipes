import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/contexts';
import { fetchMealsExplore } from '../services/apis';
import styles from '../styles/Recipes.module.css';

function ButtonsFiltersFoods() {
  const [categoriesFoods, setCategoriesFoods] = useState([]);
  const [toogleFoods, setToogleFoods] = useState('');
  const { setCategoryFoodsButton,
    setClickedFoods,
  } = useContext(RecipesContext);

  const filterByCategory = async ({ target }) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.name}`;
    const response = await fetch(url);
    const data = await response.json();
    setCategoryFoodsButton(data.meals);
    return response.ok ? Promise.resolve(data.meals) : Promise.reject(data);
  };

  const five = 5;
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchMealsExplore('categories', 'list');
      setCategoriesFoods(data);
    };
    getCategories();
  }, []);

  return (
    <>
      {categoriesFoods.filter((_category, indice) => indice < five).map((item) => (
        <button
          type="button"
          key={ item.strCategory }
          name={ item.strCategory }
          data-testid={ `${item.strCategory}-category-filter` }
          onClick={ (param) => {
            if (toogleFoods === '') {
              setClickedFoods(true);
              setToogleFoods(item.strCategory);
            }
            if (toogleFoods === item.strCategory) {
              setClickedFoods(false);
              setToogleFoods('');
            }
            filterByCategory(param);
          } }
          className={ styles.button }
        >
          { item.strCategory }
        </button>
      ))}
    </>
  );
}

export default ButtonsFiltersFoods;
