import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { copyLink } from '../services/servicesDetails';
import styles from '../styles/DoneRecipes.module.css';

function DoneRecipesCard(props) {
  const [isCopied, setIsCopied] = useState(false);
  const { recipe: {
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  }, index } = props;
  const pathname = `/${type}s/${id}`;

  return (
    <div>
      <Link to={ pathname }>
        <img
          src={ image }
          alt="Imagem da receita bem massa, fera!"
          data-testid={ `${index}-horizontal-image` }
          width="10rem"
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'food' ? `${nationality} - ${category}`
          : alcoholicOrNot}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      {tags.map((tagName) => (
        <p
          key={ `${index}-${tagName}` }
          data-testid={ `${index}-${tagName}-horizontal-tag` }
        >
          { tagName }
        </p>
      ))}
      <button
        className={ styles.tooltip }
        type="button"
        onClick={ () => copyLink(pathname, setIsCopied) }
      >
        <span className={ styles.tooltiptext }>
          {isCopied ? 'Link copied!' : 'Copy'}
        </span>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src="../../images/shareIcon.svg"
          alt="share"
          width="30px"
        />
      </button>
    </div>
  );
}

DoneRecipesCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default DoneRecipesCard;
