import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Explore.module.css';

function IngredientDrinkCard(props) {
  const { index, ingredient } = props;

  return (
    <figure data-testid={ `${index}-ingredient-card` } className={ styles.card }>
      <img
        src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
        alt=""
        data-testid={ `${index}-card-img` }
      />
      <figcaption data-testid={ `${index}-card-name` }>
        { ingredient }
      </figcaption>
    </figure>
  );
}

IngredientDrinkCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default IngredientDrinkCard;
