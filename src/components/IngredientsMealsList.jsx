import React, { useEffect, useState } from 'react';
import { fetchMealsExplore } from '../services/apis';
import IngredientMealCard from './IngredientMealCard';
import styles from '../styles/Explore.module.css';

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
    <main className={ styles.container }>
      <section className={ styles.row }>
        {ingredientsMealsList.filter((item, index) => index < max)
          .map((ingredient, index) => (
            <IngredientMealCard
              key={ ingredient.idIngredient }
              index={ index }
              ingredient={ ingredient.strIngredient }
            />
          ))}
      </section>
    </main>
  );
}

export default IngredientsMealsList;
