import React from 'react';
import DrinksList from '../../components/DrinksList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import RecipesProvider from '../../context/recipesProvider';

function Drinks() {
  return (
    <RecipesProvider>
      <Header tittle="Drinks">
        <SearchBar />
      </Header>

      <DrinksList />

      <Footer />
    </RecipesProvider>
  );
}

export default Drinks;
