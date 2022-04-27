import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Buttons';
import './Footer.css';
import '../images/drinkIcon.svg';
import '../images/exploreIcon.svg';
import '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" className="footer-container">
      <Button
        className="drinks-bottom-btn"
        data-testid="drinks-bottom-btn"
        srcIcon="../images/drinkIcon.svg"
        altIcon="drink icon"
        onClick={ () => history.push('/drinks') }
      />
      <Button
        className="explore-bottom-btn"
        data-testid="explore-bottom-btn"
        srcIcon="../images/exploreIcon.svg"
        altIcon="explore icon"
        onClick={ () => history.push('/explore') }
      />
      <Button
        className="food-bottom-btn"
        data-testid="food-bottom-btn"
        srcIcon="../images/mealIcon.svg"
        altIcon="meal icon"
        onClick={ () => history.push('/foods') }
      />
    </footer>
  );
}

export default Footer;
