import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCard(props) {
  const { drink, index } = props;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link to={ `/drinks/${drink.idDrink}` }>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid={ `${index}-card-img` }
          width="200px"
        />
      </Link>
      <br />
      <span data-testid={ `${index}-card-name` }>{drink.strDrink}</span>
    </div>
  );
}

DrinkCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default DrinkCard;
