import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import Button from './Buttons';

function ButtonsFiltersDrinks() {
  const [categories, setCategories] = useState([]);
  // const history = useHistory();
  const five = 5;
  useEffect(() => {
    const getCategories = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const data = await response.json();
      setCategories(data.drinks);
    };
    getCategories();
  }, []);
  return (
    <div>
      {categories.filter((_category, indice) => indice < five).map((item) => (<Button
        key={ item.strCategory }
        text={ item.strCategory }
        dataTestId={ `${item.strCategory}-category-filter` }
        onClick={ () => {} }
      />))}

    </div>
  );
}

export default ButtonsFiltersDrinks;
