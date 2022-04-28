import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Buttons';

function DrinksExplore() {
  return (
    <>
      <Header tittle="Explore Drinks" />
      <main>
        <Button
          text="By Ingredient"
          dataTestId="explore-by-ingredient"
        />
        <Button
          text="Surprise me!"
          dataTestId="explore-surprise"
        />
      </main>
      <Footer />
    </>
  );
}

export default DrinksExplore;
