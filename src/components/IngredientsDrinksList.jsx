import React, { useEffect, useState } from 'react';
import { fetchDrinksExplore } from '../services/apis';
import IngredientDrinkCard from './IngredientDrinkCard';
import styles from '../styles/Explore.module.css';

function IngredientsDrinksList() {
  const [ingredientsDrinksList, setIngredientsDrinksList] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const data = await fetchDrinksExplore('ingredients');
      console.log(data);
      setIngredientsDrinksList(data);
    };
    fetchIngredients();
  }, []);
  const max = 12;

  return (
    <main className={ styles.container }>
      <section className={ styles.row }>
        {ingredientsDrinksList.filter((_item, index) => index < max)
          .map((ingredient, index) => (
            <IngredientDrinkCard
              key={ ingredient.strIngredient1 }
              index={ index }
              ingredient={ ingredient.strIngredient1 }
            />
          ))}
      </section>
    </main>
  );
}

export default IngredientsDrinksList;
