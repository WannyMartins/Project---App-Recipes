import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import styles from '../styles/Header.module.css';

function Header(props) {
  const { tittle, children } = props;

  return (
    <header className={ styles.header }>
      <Link
        to="/profile"
        href="link to profile"
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile"
          width="30px"
        />
      </Link>

      <h1 data-testid="page-title">{ tittle }</h1>

      { children }
    </header>
  );
}

Header.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Header;
