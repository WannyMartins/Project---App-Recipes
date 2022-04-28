import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Buttons';

function FoodsExplore() {
  return (
    <>
      <Header tittle="Explore Foods" />
      <main>
        <Button
          text="By Ingredient"
          dataTestId="explore-by-ingredient"
        />
        <Button
          text="By Nationality"
          dataTestId="explore-by-nationality"
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

export default FoodsExplore;
