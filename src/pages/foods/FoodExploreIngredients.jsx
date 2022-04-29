import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientsList from '../../components/IngredientsList';

function FoodExploreIngredients() {
  return (
    <>
      <Header tittle="Explore Ingredients" />
      <IngredientsList />
      <Footer />
    </>
  );
}

export default FoodExploreIngredients;
