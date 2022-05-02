import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientsMealsList from '../../components/IngredientsMealsList';

function FoodExploreIngredients() {
  return (
    <>
      <Header tittle="Explore Ingredients" />
      <IngredientsMealsList />
      <Footer />
    </>
  );
}

export default FoodExploreIngredients;
