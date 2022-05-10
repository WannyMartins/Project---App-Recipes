import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <footer data-testid="footer" className={ styles.footer }>
      <Link
        to="/drinks"
        className="drinks-bottom-btn"
      >
        <img
          src={ drinkIcon }
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link
        to="/explore"
        className="explore-bottom-btn"
      >
        <img
          src={ exploreIcon }
          alt="explore icon"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link
        to="/foods"
        className="food-bottom-btn"
      >
        <img
          src={ mealIcon }
          alt="meal icon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
