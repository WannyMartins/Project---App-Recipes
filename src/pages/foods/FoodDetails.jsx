import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchDetails } from '../../services/apis';

function FoodDetails() {
  const index = 'o';
  const [details, setDetails] = useState([]);

  const history = useHistory();

  useEffect(() => {
    try {
      const getDetails = async () => {
        const data = await fetchDetails('food');

        if (data) {
          setDetails(data);
        }

        console.log(details);
        console.log(history);
      };
      getDetails();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <img data-testid="recipe-photo" src="recipe" alt="recie" />
      <h1 data-testid="recipe-title">Recipe</h1>

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

      <h3 data-testid="recipe-category">Category</h3>

      <div>
        Ingredients:
        <li data-testid={ `${index}-ingredient-name-and-measure` }>i</li>
      </div>

      <p data-testid="instructions">Instruções</p>

      {/* <video data-testid="video" width="320" height="240" controls>
        <source src="movie.mp4" type="video/mp4" />
      </video> */}

      <button
        type="button"
        data-testid="favorite-btn"
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

export default FoodDetails;
