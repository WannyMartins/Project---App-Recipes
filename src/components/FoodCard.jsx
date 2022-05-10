import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Recipes.module.css';

function FoodCard(props) {
  const { meal, index, cardTestId, titleTestId } = props;

  return (
    <div key={ meal.idMeal } data-testid={ cardTestId } className={ styles.card }>
      <Link to={ `/foods/${meal.idMeal}` } data-testid="link-details">
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
