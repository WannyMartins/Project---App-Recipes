import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import DrinkCard from '../../components/DrinkCard';
import { fetchDetails, fetchDrinksSearch } from '../../services/apis';
import { getIngredientsData, verifyIfHasStarted,
  handleStartBtn, copyLink, verifyFavorite,
  addOrRemoveFromLocalStorage } from '../../services/servicesDetails';
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
  const [isFavorite, setIsFavorite] = useState(false);

  const handleStartRecipe = () => {
    handleStartBtn(ingredients, id, 'meals', setStarted);
    history.push(`/foods/${id}/in-progress`);
  };

  const handleFavorite = () => {
    setIsFavorite((fav) => (!fav));
    const objFav = { id,
      type: 'food',
      nationality: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
    };
    addOrRemoveFromLocalStorage(!isFavorite, objFav);
  };

  useEffect(() => {
    try {
      const getDetails = async () => {
        const responseDetails = await fetchDetails('food', id);
        const dataDetails = responseDetails.meals[0];

        const six = 6;
        const responseRecomend = await fetchDrinksSearch({ search: '' });
        const dataRecomend = responseRecomend.filter((item, indice) => indice < six);
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

    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }

    setStarted(verifyIfHasStarted(id, 'meals'));
    setIsFavorite(verifyFavorite(id));
  }, [id]);

  return (
    <>
      <main className={ styles.container }>
        <section className={ styles.wrapper }>
          <figure className={ styles.card }>
            <img data-testid="recipe-photo" src={ details.strMealThumb } alt="recipe" />
            <h1 data-testid="recipe-title">{details.strMeal}</h1>
          </figure>
          <button
            className={ `${styles.tooltip} ${styles.button}` }
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
            onClick={ handleFavorite }
            className={ styles.button }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorite
                ? '../../images/blackHeartIcon.svg'
                : '../../images/whiteHeartIcon.svg' }
              alt={ isFavorite ? 'favorited' : 'add to favorites' }
              width="30px"
            />
          </button>
        </section>
        <article className={ styles.wrapper }>
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
        </article>
        <aside className={ styles.wrapper }>
          <section className={ styles.carousel }>
            {recomendations
              .map((drink, index) => (
                <DrinkCard
                  key={ drink.idDrink }
                  cardTestId={ `${index}-recomendation-card` }
                  titleTestId={ `${index}-recomendation-title` }
                  drink={ drink }
                  index={ index }
                />
              ))}
          </section>
        </aside>
      </main>
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
    </>
  );
}

export default FoodDetails;
