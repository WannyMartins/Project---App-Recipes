import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function FoodCard(props) {
  const { meal, index, cardTestId, titleTestId } = props;

  return (
    <div key={ meal.idMeal } data-testid={ cardTestId }>
      <Link to={ `/foods/${meal.idMeal}` }>
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          data-testid={ `${index}-card-img` }
        />
        <br />
        <span data-testid={ titleTestId }>{meal.strMeal}</span>
      </Link>
    </div>
  );
}

FoodCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default FoodCard;
