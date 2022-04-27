import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

function Foods() {
  const [mealsList, setMealsList] = useState([]);

  useEffect(() => {
    try {
      const fetchMealsTwelveRecipes = async () => {
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetch(url);
        const data = await response.json();
        setMealsList(data.meals);
      };
      fetchMealsTwelveRecipes();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <Header tittle="Foods">
        <SearchBar />
      </Header>
      {mealsList.map((meal, index) => (
        <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
          <Link to={ `/foods/${meal.idMeal}` }>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
              width="200px"
            />
            <br />
            <span data-testid={ `${index}-card-name` }>{meal.strMeal}</span>
          </Link>
        </div>
      ))}
      <Footer />
    </div>

  );
}

export default Foods;
