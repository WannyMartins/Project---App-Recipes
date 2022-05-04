import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RecipesContext } from './contexts';

function RecipesProvider(props) {
  const { children } = props;

  const [foodsList, setFoodsList] = useState([]);
  const [searchThis, setSearchThis] = useState({ search: '', input: '' });
  const [categoryFoodsButton, setCategoryFoodsButton] = useState([]);
  const [clickedFoods, setClickedFoods] = useState(false);

  const [categoryDrinksButton, setCategoryDrinksButton] = useState([]);
  const [clickedDrinks, setClickedDrinks] = useState(false);
  const [drinksList, setDrinksList] = useState([]);

  const contextValue = { searchThis,
    setSearchThis,
    categoryDrinksButton,
    setCategoryDrinksButton,
    setClickedDrinks,
    clickedDrinks,
    drinksList,
    setDrinksList,
    categoryFoodsButton,
    setCategoryFoodsButton,
    foodsList,
    setFoodsList,
    clickedFoods,
    setClickedFoods,
  };
  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default RecipesProvider;
