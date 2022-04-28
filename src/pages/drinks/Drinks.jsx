import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Buttons';
import ButtonsFiltersDrinks from '../../components/ButtonsFiltersDrinks';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import RecipesProvider from '../../context/recipesProvider';

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
  const twelve = 12;
  console.log(drinksList);
  return (
    <RecipesProvider>
      <Header tittle="Drinks">
        <SearchBar />
      </Header>
      <ButtonsFiltersDrinks />
      <Button
        type="button"
        text="All"
        dataTestId="All-category-filter"
      />
      {drinksList.filter((_drinks, indice) => indice < twelve).map((drink, index) => (
        <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/drinks/${drink.idDrink}` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
              width="200px"
            />
          </Link>
          <br />
          <span data-testid={ `${index}-card-name` }>{drink.strDrink}</span>
        </div>
      ))}
      <Footer />
    </RecipesProvider>
  );
}

export default Drinks;
