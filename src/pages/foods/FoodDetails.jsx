import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DrinkCard from '../../components/DrinkCard';
import { fetchDetails, fetchDrinksSearch } from '../../services/apis';
import getIngredientsData from '../../services/formatIngredients';

function FoodDetails() {
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState([]);

  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];

  useEffect(() => {
    try {
      const getDetails = async () => {
        const responseDetails = await fetchDetails('food', id);
        const dataDetails = responseDetails.meals[0];

        const six = 6;
        const responseRecomend = await fetchDrinksSearch({ search: '' });
        const dataRecomend = responseRecomend.filter((item, indice) => indice < six);
        console.log(dataRecomend);
        setRecomendations(dataRecomend);

        if (dataDetails) {
          setDetails(dataDetails);
          const ingredientsList = getIngredientsData(dataDetails);
          setIngredients(ingredientsList);
        }
      };
      getDetails();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <img data-testid="recipe-photo" src={ details.strMealThumb } alt="recie" />
      <h1 data-testid="recipe-title">{details.strMeal}</h1>

      <div>
        <button
          type="button"
          data-testid="share-btn"
        >
          Share
        </button>

        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorite
        </button>
      </div>

      <h3 data-testid="recipe-category">{details.strCategory}</h3>

      <ul>
        {
          ingredients.map((ingredient, index) => (
            <li
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ `${index}-ingredient-name-and-measure` }
            >
              <p>{ ingredient[0] }</p>
              <p>{ ingredient[1] }</p>
            </li>
          ))
        }
      </ul>

      <p data-testid="instructions">{details.strInstructions}</p>

      <video
        data-testid="video"
        src={ details.strYoutube }
        width="320"
        height="240"
        controls
      >
        <track
          default
          kind="captions"
          src={ details.strYoutube }
        />
        Sorry, your browser does not support embedded videos.
        <source type="video/mp4" />
      </video>

      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Start cooking
      </button>

      <section className="recomended">
        {
          recomendations.map((drink, index) => (
            <DrinkCard
              key={ drink.idDrink }
              testId={ `${index}-recomendation-card` }
              drink={ drink }
              index={ index }
            />

          ))
        }
      </section>

    </div>
  );
}

export default FoodDetails;
