import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchDetails } from '../../services/apis';
import styles from '../../styles/Drinks.module.css';

function DrinkDetails() {
  const indx = 0;
  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const { location: { pathname } } = useHistory();
  const id = pathname.split('/')[2];

  const getIngredientsData = (data) => {
    const nameImg = Object.entries(data).filter((item) => item[0]
      .includes('strIngredient') && item[1] !== null).map((item) => item[1]);

    const measures = Object.entries(data).filter((item) => item[0]
      .includes('strMeasure') && item[1] !== null).map((item) => item[1]);
    console.log(nameImg);
    console.log(measures);

    const formatedIngredients = nameImg.map((item, indice) => {
      const combine = measures[indice] ? indice : 0;
      return [item, measures[combine]];
    });

    return formatedIngredients;
  };

  useEffect(() => {
    try {
      const getDetails = async () => {
        const response = await fetchDetails('drink', id);
        const data = response.drinks[0];

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
    <main className={ styles.container }>
      <article className={ styles.wrapper }>
        <figure className={ styles.card }>
          <img data-testid="recipe-photo" src={ details.strDrinkThumb } alt="recie" />
          <h1 data-testid="recipe-title">{details.strDrink}</h1>
        </figure>
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
        <h3 data-testid="recipe-category">
          { `${details.strCategory} - ${details.strAlcoholic}` }
        </h3>
        <ul className={ styles.list }>
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
        <div className={ styles.card }>
          <video
            data-testid="video"
            src={ details.strYoutube }
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
        </div>
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
      </article>
    </main>
  );
}

export default DrinkDetails;
