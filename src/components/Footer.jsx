import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Buttons';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <Button
        data-testid="drinks-bottom-btn"
        text="drinks"
        onClick={ () => history.push('/drinks') }
      />
      <Button
        data-testid="explore-bottom-btn"
        text="explore"
        onClick={ () => history.push('/explore') }
      />
      <Button
        data-testid="food-bottom-btn"
        text="food"
        onClick={ () => history.push('/foods') }
      />
    </footer>
  );
}

export default Footer;
