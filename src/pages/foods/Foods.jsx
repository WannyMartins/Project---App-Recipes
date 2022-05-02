import React, { useEffect } from 'react';
import Button from '../../components/Buttons';
import ButtonsFiltersFoods from '../../components/ButtonsFiltersFoods';
import FoodsList from '../../components/FoodsList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

function Foods() {
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) localStorage.setItem('user', JSON.stringify({ email: '' }));
  }, []);

  return (
    <>
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
    </>
  );
}

export default Foods;
