import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    text,
    dataTestId,
    onClick,
    srcIcon,
    altIcon,
    className,
    disabled,
    name,
  } = props;

  return (
    <button
      type="button"
      className={ className }
      data-testid={ dataTestId }
      onClick={ () => onClick() }
      disabled={ disabled }
      name={ name }
    >
      { text }
      { <img src={ srcIcon } alt={ altIcon } /> }
    </button>);
}

Button.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Button;
