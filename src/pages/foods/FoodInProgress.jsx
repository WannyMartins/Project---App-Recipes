import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import DrinkCard from '../../components/DrinkCard';
import { fetchDetails /* , fetchDrinksSearch */ } from '../../services/apis';
import { getIngredientsData, verifyIfHasStarted,
  /* handleStartBtn, */ copyLink, verifyFavorite,
  addOrRemoveFromLocalStorage } from '../../services/servicesDetails';

function FoodInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];

  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [started, setStarted] = useState(verifyIfHasStarted(id, 'meals'));
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFinishRecipe = () => {
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
    console.log(objFav);
    addOrRemoveFromLocalStorage(!isFavorite, objFav);
  };

  useEffect(() => {
    try {
      const getDetails = async () => {
        const responseDetails = await fetchDetails('food', id);
        const dataDetails = responseDetails.meals[0];

        // const six = 6;
        // const responseRecomend = await fetchDrinksSearch({ search: '' });
        // const dataRecomend = responseRecomend.filter((item, indice) => indice < six);
        // setRecomendations(dataRecomend);

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
  }, []);

  return (
    <div>
      <img data-testid="recipe-photo" src={ details.strMealThumb } alt="recipe" />
      <h1 data-testid="recipe-title">{details.strMeal}</h1>

      <div>
        <button
          data-testid="share-btn"
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
          data-testid="favorite-btn"
          type="button"
          onClick={ handleFavorite }
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
      </div>

      <p data-testid="recipe-category">{details.strCategory}</p>
      <br />

      <p>Ingredients</p>

      {
        ingredients.map((ingredient, index) => (
          <div key={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              data-testid={ `${index}-ingredient-step` }
            />
            {/* <p data-testid={ `${index}-ingredient-step` }>{ ingredient[0] }</p> */}
            <p>{ ingredient[0] }</p>
            <p>{ ingredient[1] }</p>
          </div>
        ))
      }
      <br />

      <p>Instructions</p>
      <p data-testid="instructions">{details.strInstructions}</p>
      <br />

      {/* BOTÃO DE FINALIZAR A RECEITA */}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleFinishRecipe }
      >
        {/* Finish Recipe */}
        {
          !started
            ? ('Finish Recipe')
            : ('Continue Recipe')
        }
      </button>

    </div>
  );
}

export default FoodInProgress;
