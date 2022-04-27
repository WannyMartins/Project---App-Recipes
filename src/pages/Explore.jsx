import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Buttons from '../components/Buttons';

function Explore() {
  const history = useHistory();
  return (
    <>
      <Header />
      <div>
        <button
          data-testid="explore-foods"
          type="button"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
        <Buttons />
      </div>
      <Footer />
    </>
  );
}

export default Explore;
