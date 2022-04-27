import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header(props) {
  const { tittle, children } = props;

  return (
    <header>
      <Link
        to="/profile"
        href="link to profile"
      >
        <img
          data-testid="profile-top-btn"
          src="../images/profileIcon.svg"
          alt="profile"
          width="30px"
        />
      </Link>

      <p data-testid="page-title">{ tittle }</p>

      { children }
    </header>
  );
}

Header.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Header;
