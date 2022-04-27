import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Buttons from './Buttons';

function Header(props) {
  const { tittle } = props;

  return (
    <header>
      <Link
        data-testid="profile-top-btn"
        href="link to profile"
      >
        <img src="../images/profileIcon.svg" alt="profile" width="30px" />
      </Link>

      <p data-testid="page-title">{ tittle }</p>

      <Buttons
        dataTestId="search-top-btn"
      />
    </header>
  );
}

Header.propTypes = {
  tittle: PropTypes.string,
}.isRequired;

export default Header;
