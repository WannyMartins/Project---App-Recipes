import React, { useEffect, useState } from 'react';
import { fetchMealsExplore } from '../services/apis';
import IngredientMealCard from './IngredientMealCard';

function IngredientsMealsList() {
  const [ingredientsMealsList, setIngredientsMealsList] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const data = await fetchMealsExplore('ingredients');
      setIngredientsMealsList(data);
    };
    fetchIngredients();
  }, []);
  const max = 12;

  return (
    <main>
      {ingredientsMealsList.filter((item, index) => index < max)
        .map((ingredient, index) => (
          <IngredientMealCard
            key={ ingredient.idIngredient }
            index={ index }
            ingredient={ ingredient.strIngredient }
          />
        ))}
    </main>
  );
}

export default IngredientsMealsList;
