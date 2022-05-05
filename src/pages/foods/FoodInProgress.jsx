import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchDetails } from '../../services/apis';
import {
  addOrRemoveFromLocalStorage, copyLink,
  getIngredientsData, verifyFavorite, verifyIfHasStarted,
} from '../../services/servicesDetails';

function FoodInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const newPathName = pathname.replace('/in-progress', '');

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

        if (dataDetails) {
          setDetails(dataDetails);
          const ingredientsList = getIngredientsData(dataDetails);
          // console.log(ingredientsList);
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
          className="tooltip"
          type="button"
          onClick={ () => copyLink(newPathName, setIsCopied) }
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
          <label
            htmlFor={ `${index}-ingredient-step` }
            key={ `${index}-ingredient-step` }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `${index}-ingredient-step` }
            />
            <p>{ ingredient[0] }</p>
            <p>{ ingredient[1] }</p>
          </label>
        ))
      }
      <br />

      <p>Instructions</p>
      <p data-testid="instructions">{details.strInstructions}</p>
      <br />

      {/* BOTÃO DE FINALIZAR A RECEITA */}
      <button
        type="button"
        className="finish-recipe-btn"
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
