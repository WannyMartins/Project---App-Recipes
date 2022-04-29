import React, { useEffect, useState } from 'react';
import { fetchMealsExplore } from '../services/apis';
import IngredientCard from './IngredientCard';

function IngredientsList() {
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const data = await fetchMealsExplore('ingredients');
      console.log(data);
      setIngredientsList(data);
    };
    fetchIngredients();
  }, []);
  const max = 12;

  return (
    <main>
      {ingredientsList.filter((item, index) => index < max)
        .map((ingredient, index) => (
          <IngredientCard
            key={ ingredient.idIngredient }
            index={ index }
            ingredient={ ingredient.strIngredient }
          />
        ))}
    </main>
  );
}

export default IngredientsList;
