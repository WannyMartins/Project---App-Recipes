import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Buttons';

function FoodsExplore() {
  const [randomFood, setRandomFood] = useState([]);
  const history = useHistory();
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';

  useEffect(() => {
    const fetchRandomFood = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      setRandomFood(data.meals);
    };
    fetchRandomFood();
  }, []);

  return (
    <>
      <Header tittle="Explore Foods" />
      <main>
        <Button
          text="By Ingredient"
          dataTestId="explore-by-ingredient"
          onClick={ () => history.push('/explore/foods/ingredients') }
        />
        <Button
          text="By Nationality"
          dataTestId="explore-by-nationality"
          onClick={ () => history.push('/explore/foods/nationalities') }
        />
        <Button
          text="Surprise me!"
          dataTestId="explore-surprise"
          onClick={ () => console.log(randomFood) }
        />
      </main>
      <Footer />
    </>
  );
}

export default FoodsExplore;
