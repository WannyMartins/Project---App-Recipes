import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Recipes.module.css';

function DrinkCard(props) {
  const { drink, index, cardTestId, titleTestId } = props;

  return (
    <div data-testid={ cardTestId } key={ drink.idDrink } className={ styles.card }>
      <Link to={ `/drinks/${drink.idDrink}` }>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid={ `${index}-card-img` }
        />
        <br />
        <span data-testid={ titleTestId }>{drink.strDrink}</span>
      </Link>
    </div>
  );
}

DrinkCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default DrinkCard;
