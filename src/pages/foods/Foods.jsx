import React from 'react';
import Button from '../../components/Buttons';
import ButtonsFiltersFoods from '../../components/ButtonsFiltersFoods';
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
      <ButtonsFiltersFoods />
      <Button
        type="button"
        text="All"
        dataTestId="All-category-filter"
      />

      <FoodsList />

      <Footer />
    </RecipesProvider>
  );
}

export default Foods;
