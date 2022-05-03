import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DrinkCard from '../../components/DrinkCard';
import { fetchDetails, fetchDrinksSearch } from '../../services/apis';
import { getIngredientsData, verifyIfHasStarted,
  handleStartBtn, copyLink } from '../../services/servicesDetails';
import styles from '../../styles/Recipes.module.css';

function FoodDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];

  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [started, setStarted] = useState(verifyIfHasStarted(id, 'meals'));
  const [isCopied, setIsCopied] = useState(false);

  const handleStartRecipe = () => {
    handleStartBtn(ingredients, id, 'meals', setStarted);
    history.push(`/foods/${id}/in-progress`);
  };

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

    setStarted(verifyIfHasStarted(id, 'meals'));
  }, [id]);

  return (
    <main className={ styles.container }>
      <article className={ styles.wrapper }>
        <figure className={ styles.card }>
          <img data-testid="recipe-photo" src={ details.strMealThumb } alt="recie" />
          <h1 data-testid="recipe-title">{details.strMeal}</h1>
        </figure>
        <div>
          <button
            className={ styles.tooltip }
            type="button"
            onClick={ () => copyLink(pathname, setIsCopied) }
          >
            <span className={ styles.tooltiptext }>
              {isCopied ? 'Link copied!' : 'Copy'}
            </span>
            <img
              data-testid="share-btn"
              src="../../images/shareIcon.svg"
              alt="share"
              width="30px"
            />
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favorite
          </button>
        </div>
        <h3 data-testid="recipe-category">{details.strCategory}</h3>
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
          onClick={ handleStartRecipe }
          className={ `${styles.button} ${styles.start}` }
        >
          {
            !started
              ? ('Start Recipe')
              : ('Continue Recipe')
          }
        </button>
        <section className="recomended">
          {
            recomendations.map((drink, index) => (
              <DrinkCard
                key={ drink.idDrink }
                cardTestId={ `${index}-recomendation-card` }
                titleTestId={ `${index}-recomendation-title` }
                drink={ drink }
                index={ index }
              />
            ))
          }
        </section>
      </article>
    </main>
  );
}

export default FoodDetails;
