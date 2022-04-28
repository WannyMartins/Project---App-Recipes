import React from 'react';
import FoodsList from '../../components/FoodsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import RecipesProvider from '../../context/recipesProvider';

function Foods() {
  return (
    <RecipesProvider>
      <Header tittle="Foods">
        <SearchBar />
      </Header>

      <FoodsList />

      <Footer />
    </RecipesProvider>

  );
}

export default Foods;
