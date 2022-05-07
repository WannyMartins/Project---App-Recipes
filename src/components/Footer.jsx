import React from 'react';
import { Link } from 'react-router-dom';
import '../images/drinkIcon.svg';
import '../images/exploreIcon.svg';
import '../images/mealIcon.svg';
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <footer data-testid="footer" className={ styles.footer }>
      <Link
        to="/drinks"
        className="drinks-bottom-btn"
      >
        <img
          src="../images/drinkIcon.svg"
          alt="drink icon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link
        to="/explore"
        className="explore-bottom-btn"
      >
        <img
          src="../images/exploreIcon.svg"
          alt="explore icon"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link
        to="/foods"
        className="food-bottom-btn"
      >
        <img
          src="../images/mealIcon.svg"
          alt="meal icon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
