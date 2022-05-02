import React, { useEffect } from 'react';
import ButtonsFiltersFoods from '../../components/ButtonsFiltersFoods';
import FoodsList from '../../components/FoodsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import RecipesProvider from '../../context/recipesProvider';

function Foods() {
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) localStorage.setItem('user', JSON.stringify({ email: '' }));
  }, []);

  return (
    <RecipesProvider>
      <Header tittle="Foods">
        <SearchBar />
      </Header>
      <ButtonsFiltersFoods />
      <FoodsList />
      <Footer />
    </RecipesProvider>
  );
}

export default Foods;
