import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import { fetchMeals } from '../services/apis';
import Button from './Buttons';

function ButtonsFiltersFoods() {
  const [categories, setCategories] = useState([]);
  // const history = useHistory();
  const five = 5;
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchMeals('categories', 'list');
      setCategories(data);
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

export default ButtonsFiltersFoods;
