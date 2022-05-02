import React, { useEffect } from 'react';
import Button from '../../components/Buttons';
import ButtonsFiltersDrinks from '../../components/ButtonsFiltersDrinks';
import DrinksList from '../../components/DrinksList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

function Drinks() {
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) localStorage.setItem('user', JSON.stringify({ email: '' }));
  }, []);

  return (
    <>
      <Header tittle="Drinks">
        <SearchBar />
      </Header>
      <ButtonsFiltersDrinks />
      <Button
        type="button"
        text="All"
        dataTestId="All-category-filter"
      />

      <DrinksList />

      <Footer />
    </>
  );
}

export default Drinks;
