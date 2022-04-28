import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Buttons';

function DrinksExplore() {
  const [randomDrink, setRandomDrink] = useState('');
  const history = useHistory();
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  useEffect(() => {
    const fetchRandomDrink = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const { idDrink } = data.drinks[0];
      setRandomDrink(idDrink);
    };
    fetchRandomDrink();
  }, []);

  return (
    <>
      <Header tittle="Explore Drinks" />
      <main>
        <Button
          text="By Ingredient"
          dataTestId="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        />
        <Button
          text="Surprise me!"
          dataTestId="explore-surprise"
          onClick={ () => history.push(`/drinks/${randomDrink}`) }
        />
      </main>
      <Footer />
    </>
  );
}

export default DrinksExplore;
