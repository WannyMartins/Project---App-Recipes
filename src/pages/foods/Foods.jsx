import React, { useEffect, useState } from 'react';

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
      {/* <Header /> */}
      {mealsList.map((meal, index) => (
        <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid={ `${index}-card-img` }
            width="200px"
          />
          <br />
          <h3 data-testid={ `${index}-card-name` }>{meal.strMeal}</h3>
        </div>
      ))}
      {/* <Footer /> */}
    </div>

  );
}

export default Foods;
