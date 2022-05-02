import React from 'react';
import DrinksList from '../../components/DrinksList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

function Drinks() {
  return (
    <>
      <Header tittle="Drinks">
        <SearchBar />
      </Header>

      <DrinksList />

      <Footer />
    </>
  );
}

export default Drinks;
