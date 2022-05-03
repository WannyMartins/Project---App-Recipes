import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import FoodCard from '../../components/FoodCard';
import { fetchDetails, fetchMealsSearch } from '../../services/apis';
import { getIngredientsData, verifyIfHasStarted,
  handleStartBtn, copyLink } from '../../services/servicesDetails';
import styles from '../../styles/Drinks.module.css';

function DrinkDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];

  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [started, setStarted] = useState(verifyIfHasStarted(id, 'cocktails'));
  const [isCopied, setIsCopied] = useState(false);

  const handleStartRecipe = () => {
    handleStartBtn(ingredients, id, 'cocktails', setStarted);
    history.push(`/drinks/${id}/in-progress`);
  };

  useEffect(() => {
    try {
      const getDetails = async () => {
        const responseDetails = await fetchDetails('drink', id);
        const dataDetails = responseDetails.drinks[0];

        const six = 6;
        const responseRecomend = await fetchMealsSearch({ search: '' });
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

    setStarted(verifyIfHasStarted(id, 'cocktails'));
  }, []);

  return (
    <main>
      {/* className={ styles.container } */}
      <article>
        {/* // className={ styles.wrapper } */}
        <figure className={ styles.card }>
          <img data-testid="recipe-photo" src={ details.strDrinkThumb } alt="recie" />
          <h1 data-testid="recipe-title">{details.strDrink}</h1>
        </figure>
        <div>
          <button
            className="tooltip"
            type="button"
            onClick={ () => copyLink(pathname, setIsCopied) }
          >
            <span className="tooltiptext" id="myTooltip">
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

        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleStartRecipe }
        >
          {
            !started
              ? ('Start Recipe')
              : ('Continue Recipe')
          }
        </button>

        <section className="recomendations">
          {
            recomendations
              .map((meal, index) => (
                <FoodCard
                  key={ meal.idMeal }
                  testId={ `${index}-recomendation-card` }
                  meal={ meal }
                  index={ index }
                />
              ))
          }
        </section>
      </article>
    </main>
  );
}

export default DrinkDetails;
