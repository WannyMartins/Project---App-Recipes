import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function FoodCard(props) {
  const { meal, index } = props;

  return (
    <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
      <Link to={ `/foods/${meal.idMeal}` }>
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          data-testid={ `${index}-card-img` }
          width="200px"
        />
        <br />
        <span data-testid={ `${index}-card-name` }>{meal.strMeal}</span>
      </Link>
    </div>
  );
}

FoodCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default FoodCard;
