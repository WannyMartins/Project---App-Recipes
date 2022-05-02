import React, { useEffect } from 'react';
import ButtonsFiltersDrinks from '../../components/ButtonsFiltersDrinks';
import DrinksList from '../../components/DrinksList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import RecipesProvider from '../../context/recipesProvider';

function Drinks() {
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) localStorage.setItem('user', JSON.stringify({ email: '' }));
  }, []);

  return (
    <RecipesProvider>
      <Header tittle="Drinks">
        <SearchBar />
      </Header>
      <ButtonsFiltersDrinks />
      <DrinksList />

      <Footer />
    </RecipesProvider>
  );
}

export default Drinks;
