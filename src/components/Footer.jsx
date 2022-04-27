import React from 'react';
import { useHistory } from 'react-router-dom';
import '../images/drinkIcon.svg';
import '../images/exploreIcon.svg';
import '../images/mealIcon.svg';
import Button from './Buttons';
import './Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" className="footer-container">
      <Button
        className="drinks-bottom-btn"
        dataTestId="drinks-bottom-btn"
        srcIcon="../images/drinkIcon.svg"
        altIcon="drink icon"
        onClick={ () => history.push('/drinks') }
      />
      <Button
        className="explore-bottom-btn"
        dataTestId="explore-bottom-btn"
        srcIcon="../images/exploreIcon.svg"
        altIcon="explore icon"
        onClick={ () => history.push('/explore') }
      />
      <Button
        className="food-bottom-btn"
        dataTestId="food-bottom-btn"
        srcIcon="../images/mealIcon.svg"
        altIcon="meal icon"
        onClick={ () => history.push('/foods') }
      />
    </footer>
  );
}

export default Footer;
