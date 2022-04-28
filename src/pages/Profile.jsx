import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Buttons';
import styles from '../styles/Profile.module.css';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header tittle="Profile" />
      <main className={ styles.container }>
        <section className={ styles.wrapper }>
          <p data-testid="profile-email">{ email }</p>
          <Button
            text="Done Recipes"
            dataTestId="profile-done-btn"
            className={ styles.button }
            onClick={ () => history.push('/done-recipes') }
          />
          <Button
            text="Favorite Recipes"
            dataTestId="profile-favorite-btn"
            className={ styles.button }
            onClick={ () => history.push('/favorite-recipes') }
          />
          <Button
            text="Logout"
            dataTestId="profile-logout-btn"
            className={ styles.button }
            onClick={ logout }
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
