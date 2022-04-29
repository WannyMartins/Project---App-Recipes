import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard(props) {
  const { index, ingredient } = props;

  return (
    <figure data-testid={ `${index}-ingredient-card` }>
      <img
        src={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
        alt=""
        data-testid={ `${index}-card-img` }
      />
      <figcaption data-testid={ `${index}-card-name` }>
        { ingredient }
      </figcaption>
    </figure>
  );
}

IngredientCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default IngredientCard;
