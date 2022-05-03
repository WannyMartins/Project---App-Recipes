import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { copyLink, verifyFavorite,
  addOrRemoveFromLocalStorage } from '../services/servicesDetails';

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
  index } = props;

  const pathname = `http://localhost:3000/${type}s/${id}`;

  const handleFavorite = () => {
    setIsFavorite((fav) => (!fav));
    const objFav = { id,
      type: 'drink',
      nationality: '',
      category: details.strCategory,
      alcoholicOrNot: details.strAlcoholic,
      name: details.strDrink,
      image: details.strDrinkThumb,
    };
    console.log(details);
    addOrRemoveFromLocalStorage(!isFavorite, objFav);
  };

  useEffect(() => {
    setIsFavorite(verifyFavorite(id));
  }, []);

  return (
    <div>
      <img
        src={ image }
        data-testid={ `${index}-horizontal-image` }
        alt={ `${index}-recipe` }
      />
      <p data-testid={ `${index}-horizontal-top-text` }>
        { type === 'food'
          ? `${nationality} - ${category}`
          : `${alcoholicOrNot}`}
      </p>
      <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      <button
        className="tooltip"
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyLink(pathname, setIsCopied) }
      >
        <span className="tooltiptext" id="myTooltip">
          {isCopied ? 'Link copied!' : 'Copy'}
        </span>
        <img
          data-testid="share-btn"
          src="../images/shareIcon.svg"
          alt="share"
          width="30px"
        />
      </button>
      <button
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
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
