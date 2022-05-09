import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { copyLink, verifyFavorite,
  addOrRemoveFromLocalStorage } from '../services/servicesDetails';
import styles from '../styles/Recipes.module.css';

function FavoriteCard(props) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const { fav: { id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image },
  index, getFavoriteList } = props;

  const pathname = `/${type}s/${id}`;

  const handleFavorite = () => {
    setIsFavorite((fav) => (!fav));
    const objFav = { id,
      // type: 'drink',
      // nationality: '',
      // category: details.strCategory,
      // alcoholicOrNot: details.strAlcoholic,
      // name: details.strDrink,
      // image: details.strDrinkThumb,
    };
    addOrRemoveFromLocalStorage(!isFavorite, objFav);
    getFavoriteList();
  };

  useEffect(() => {
    setIsFavorite(verifyFavorite(id));
  }, []);

  return (
    <div className={ styles.card }>
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          alt={ `${index}-recipe` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { type === 'food'
          ? `${nationality} - ${category}`
          : `${alcoholicOrNot}`}
      </p>
      <button
        className={ `${styles.tooltip} ${styles.button}` }
        type="button"
        onClick={ () => copyLink(pathname, setIsCopied) }
      >
        <span className="tooltiptext" id="myTooltip">
          {isCopied ? 'Link copied!' : 'Copy'}
        </span>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src="../images/shareIcon.svg"
          alt="share"
          width="30px"
        />
      </button>
      <button
        type="button"
        onClick={ handleFavorite }
        className={ styles.button }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ isFavorite
            ? '../../images/blackHeartIcon.svg'
            : '../../images/whiteHeartIcon.svg' }
          alt={ isFavorite ? 'favorited' : 'add to favorites' }
          width="30px"
        />
      </button>
    </div>
  );
}

FavoriteCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default FavoriteCard;
