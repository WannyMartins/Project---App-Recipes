import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    text,
    dataTestId,
    onClick,
  } = props;

  return (
    <button
      type="button"
      data-testid={ dataTestId }
      onClick={ () => onClick() }
    >
      { text }
    </button>);
}

Button.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Button;
