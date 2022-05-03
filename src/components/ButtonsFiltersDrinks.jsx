import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/contexts';

function ButtonsFiltersDrinks() {
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [toogleDrinks, setToogleDrinks] = useState('');

  const { setCategoryDrinksButton,
    setClickedDrinks,
  } = useContext(RecipesContext);

  const filterByCategory = async ({ target }) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.name}`;
    const response = await fetch(url);
    const data = await response.json();
    setCategoryDrinksButton(data.drinks);
    return response.ok ? Promise.resolve(data.drinks) : Promise.reject(data);
  };

  const five = 5;
  useEffect(() => {
    const getCategoriesDrinks = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const data = await response.json();
      setCategoriesDrinks(data.drinks);
    };
    getCategoriesDrinks();
  }, []);

  return (
    <div>
      {categoriesDrinks.filter((_category, indice) => indice < five).map((item) => (
        <button
          type="button"
          key={ item.strCategory }
          name={ item.strCategory }
          data-testid={ `${item.strCategory}-category-filter` }
          onClick={ (param) => {
            if (toogleDrinks === '') {
              setClickedDrinks(true);
              setToogleDrinks(item.strCategory);
            }
            if (toogleDrinks === item.strCategory) {
              setClickedDrinks(false);
              setToogleDrinks('');
            }
            filterByCategory(param);
          } }
        >
          { item.strCategory }
        </button>
      ))}

    </div>
  );
}

export default ButtonsFiltersDrinks;
