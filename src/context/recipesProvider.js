import React from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from './contexts';

function RecipesProvider(props) {
  const { children } = props;

  const [search, setSearch] = useState({ search: '', input: '' });

  const contextValue = { search, setSearch };
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
