import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchDetails } from '../../services/apis';
import getIngredientsData from '../../services/formatIngredients';

function FoodDetails() {
  const indx = '0';
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];

  useEffect(() => {
    try {
      const getDetails = async () => {
        const response = await fetchDetails('food', id);
        const data = response.meals[0];

        if (data) {
          setDetails(data);
          const ingredientsList = getIngredientsData(data);
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
        <div data-testid={ `${indx}-recomendation-card` }>
          RecomendCard
        </div>
      </section>

    </div>
  );
}

export default FoodDetails;
