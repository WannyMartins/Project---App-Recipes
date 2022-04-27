import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Buttons';

function Explore() {
  const history = useHistory();
  return (
    <>
      <Header />
      <div className="exploreButtons">
        <Button
          text="Explore Foods"
          className="exploreFoodsButton"
          dataTestID="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        />
        <Button
          text="Explore Drinks"
          className="exploreDrinksButton"
          dataTestID="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        />
      </div>
      <Footer />
    </>
  );
}

export default Explore;
