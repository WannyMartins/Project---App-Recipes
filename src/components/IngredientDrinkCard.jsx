import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../context/contexts';
import styles from '../styles/Explore.module.css';

function IngredientDrinkCard(props) {
  const { index, ingredient } = props;
  const history = useHistory();
  const { setSearchThis } = useContext(RecipesContext);

  const handleClickIngredient = (input) => {
    const query = { search: 'ingredient', input };
    setSearchThis(query);
    history.push('/drinks');
  };

  return (
    <button
      type="button"
      data-testid={ `${index}-ingredient-card` }
      onClick={ () => handleClickIngredient(ingredient) }
      className={ styles.card }
    >
      <img
        src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
        alt=""
        data-testid={ `${index}-card-img` }
      />
      <figcaption data-testid={ `${index}-card-name` }>
        { ingredient }
      </figcaption>
    </button>
  );
}

IngredientDrinkCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default IngredientDrinkCard;
