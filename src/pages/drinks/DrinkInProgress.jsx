import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchDetails } from '../../services/apis';
import { getIngredientsData, verifyIfHasStarted,
  copyLink, verifyFavorite, addDoneRecipes,
  addOrRemoveFromLocalStorage, verifyCheckedDone } from '../../services/servicesDetails';
import './DrinkInProgress.css';

function DrinkInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const newPathName = pathname.replace('/in-progress', '');

  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const controlProgress = () => {
    const result = ingredients.reduce((acc, item) => {
      const ingredient = item[0];
      if (!localStorage.getItem('doneRecipes')) {
        acc[ingredient] = false;
        return acc;
      }
      const storage = JSON.parse(localStorage.getItem('doneRecipes'));
      const recipe = storage.find((element) => element.id === id);
      acc[ingredient] = recipe.tags.some((ingName) => ingName === ingredient);
      return acc;
    }, {});
    return result;
  };

  const [started, setStarted] = useState(verifyIfHasStarted(id, 'cocktails'));
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [checkControl, setCheckControl] = useState(controlProgress());

  const handleFavorite = () => {
    setIsFavorite((fav) => (!fav));
    const objFav = { id,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
    };
    addOrRemoveFromLocalStorage(!isFavorite, objFav);
  };

  useEffect(() => {
    try {
      const getDetails = async () => {
        const responseDetails = await fetchDetails('drink', id);
        const dataDetails = responseDetails.drinks[0];

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
    if (!localStorage.getItem('doneRecipes')) {
      const date = new Date().toLocaleDateString();

      const objDone = { id,
        type: 'drink',
        nationality: '',
        category: details.strCategory,
        alcoholicOrNot: details.strAlcoholic,
        name: details.strDrink,
        image: details.strDrinkThumb,
        doneDate: date,
        tags: tagList,
      };
      addDoneRecipes(objDone);
    }

    setStarted(verifyIfHasStarted(id, 'cocktails'));
    setIsFavorite(verifyFavorite(id));
  }, []);

  useEffect(() => {
    setCheckControl(controlProgress());
    console.log(controlProgress());
  }, [ingredients]);

  const handleCheck = ({ target }) => {
    const { value, checked } = target;
    verifyCheckedDone(checked, value, setTagList);

    const tags = checked ? [...tagList, value]
      : tagList.filter((item) => item !== value);

    const isItDone = (tagList.length) === ingredients.length;
    setIsDone(isItDone);
    const date = new Date().toLocaleDateString();

    const objDone = { id,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
      doneDate: date,
      tags,
    };
    addDoneRecipes(objDone);
    setCheckControl(controlProgress());
  };

  const handleFinishBtn = () => {
    const date = new Date().toLocaleDateString();

    const objDone = { id,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
      doneDate: date,
      tags: tagList,
    };
    setIsDone((state) => (!state));
    addDoneRecipes(objDone);
    history.push('/done-recipes');
  };

  return (
    <main>
      <img data-testid="recipe-photo" src={ details.strDrinkThumb } alt="recipe" />
      <h1 data-testid="recipe-title">{details.strDrink}</h1>
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
      <p data-testid="recipe-category">
        { `${details.strCategory} - ${details.strAlcoholic}` }
      </p>
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
              onChange={ handleCheck }
              value={ ingredient[0] }
              checked={ checkControl[ingredient[0]] }
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
        onClick={ handleFinishBtn }
        disabled={ !isDone }
      >
        {
          !started
            ? ('Finish Recipe')
            : ('Finish Recipe')
        }
      </button>

    </main>
  );
}

export default DrinkInProgress;
