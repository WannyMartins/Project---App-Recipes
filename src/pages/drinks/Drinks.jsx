import React, { useEffect, useState } from 'react';
// import { Footer, Header } from '../../components';

function Drinks() {
  const [drinksList, setDrinksList] = useState([]);

  useEffect(() => {
    try {
      const fetchDrinksTwelveRecipes = async () => {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(url);
        const data = await response.json();
        setDrinksList(data.drinks);
      };
      fetchDrinksTwelveRecipes();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      {/* <Header /> */}
      {drinksList.map((drink, index) => (
        <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${index}-card-img` }
            width="200px"
          />
          <br />
          <span data-testid={ `${index}-card-name` }>{drink.strDrink}</span>
        </div>
      ))}
      {/* <Footer /> */}
    </div>
  );
}

export default Drinks;
