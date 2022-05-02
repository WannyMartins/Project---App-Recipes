import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchDetails } from '../../services/apis';

function DrinkDetails() {
  const index = '0';
  const [details, setDetails] = useState([]);

  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];

  useEffect(() => {
    try {
      const getDetails = async () => {
        const data = await fetchDetails('drink', id);

        if (data) {
          // const info = data.meals[0];
          setDetails(data.drinks[0]);
        }

        // console.log(info);
        console.log(data.drinks[0]);
        console.log(details);
      };
      getDetails();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <img data-testid="recipe-photo" src={ details.strDrinkThumb } alt="recie" />
      <h1 data-testid="recipe-title">{details.strDrink}</h1>

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

      <div>
        Ingredients:
        <li data-testid={ `${index}-ingredient-name-and-measure` }>i</li>
      </div>

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
        <div data-testid={ `${index}-recomendation-card` }>
          RecomendCard
        </div>
      </section>

    </div>
  );
}

export default DrinkDetails;
