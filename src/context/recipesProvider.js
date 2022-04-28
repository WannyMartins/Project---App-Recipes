import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from './contexts';

function RecipesProvider(props) {
  const { children } = props;

  const [searchThis, setSearchThis] = useState({ search: '', input: '' });

  const contextValue = { searchThis, setSearchThis };
  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default RecipesProvider;
