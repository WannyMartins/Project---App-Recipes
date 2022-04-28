import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Buttons';
import styles from '../styles/Explore.module.css';

function Explore() {
  const history = useHistory();
  return (
    <>
      <Header tittle="Explore" />
      <main className={ styles.container }>
        <section className={ styles.wrapper }>
          <Button
            text="Explore Foods"
            dataTestId="explore-foods"
            onClick={ () => history.push('/explore/foods') }
            className={ styles.button }
          />
          <Button
            text="Explore Drinks"
            dataTestId="explore-drinks"
            onClick={ () => history.push('/explore/drinks') }
            className={ styles.button }
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
