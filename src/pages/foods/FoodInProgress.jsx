import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { fetchDetails } from '../../services/apis';
import { getIngredientsData, verifyIfHasStarted,
  copyLink, verifyFavorite, addDoneRecipes,
  addOrRemoveFromLocalStorage, verifyCheckedDone,
  controlProgress,
} from '../../services/servicesDetails';
import styles from '../../styles/Recipes.module.css';

function FoodInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.split('/')[2];
  const newPathName = pathname.replace('/in-progress', '');

  const [details, setDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [started, setStarted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [checkControl, setCheckControl] = useState({});

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
        type: 'food',
        nationality: details.strArea,
        category: details.strCategory,
        alcoholicOrNot: '',
        name: details.strMeal,
        image: details.strMealThumb,
        doneDate: date,
        tags: tagList,
      };
      addDoneRecipes(objDone);
    }

    setStarted(verifyIfHasStarted(id, 'meals'));
    setIsFavorite(verifyFavorite(id));
  }, []);

  useEffect(() => {
    setCheckControl(controlProgress(ingredients, id, 'meals'));
    console.log(controlProgress(ingredients, id));
  }, [ingredients]);

  const handleCheck = ({ target }) => {
    const { value, checked } = target;
    verifyCheckedDone(checked, value, setTagList);

    const tags = checked ? [...tagList, value]
      : tagList.filter((item) => item !== value);

    const isItDone = (tagList.length + 1) === ingredients.length;
    setIsDone(isItDone);
    const date = new Date().toLocaleDateString();

    const objDone = { id,
      type: 'food',
      nationality: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
      doneDate: date,
      tags,
    };
    addDoneRecipes(objDone);
    setCheckControl(controlProgress(ingredients, id));
    console.log(controlProgress(ingredients, id));
  };

  const handleFinishBtn = () => {
    const date = new Date().toLocaleDateString();

    const objDone = { id,
      type: 'food',
      nationality: details.strArea,
      category: details.strCategory,
      alcoholicOrNot: '',
      name: details.strMeal,
      image: details.strMealThumb,
      doneDate: date,
      tags: tagList,
    };
    setIsDone((state) => (!state));
    addDoneRecipes(objDone);
    history.push('/done-recipes');
  };

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
                  onChange={ handleCheck }
                  value={ ingredient[0] }
                  defaultChecked={ checkControl[ingredient[0]] }
                />
                { ingredient[0] }
                { ingredient[1] }
              </label>
            ))
          }
          <br />
          <p>Instructions</p>
          <p data-testid="instructions">{details.strInstructions}</p>
          <br />
        </section>
      </main>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleFinishBtn }
        disabled={ !isDone }
        className={ `${styles.button} ${styles.start}` }
      >
        {
          !started
            ? ('Finish Recipe')
            : ('Finish Recipe')
        }
      </button>
    </>
  );
}

export default FoodInProgress;
