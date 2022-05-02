import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientsDrinksList from '../../components/IngredientsDrinksList';

function DrinksExploreIngredients() {
  return (
    <>
      <Header tittle="Explore Ingredients" />
      <IngredientsDrinksList />
      <Footer />
    </>
  );
}

export default DrinksExploreIngredients;
