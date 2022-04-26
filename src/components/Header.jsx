import React from 'react'
import { Button } from 'react-bootstrap/lib/InputGroup'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <Link 
        dataTestId="profile-top-btn"
      >Profile</Link>

      <p data-testid="page-title">Tittle</p>

      <Button 
        dataTestId="search-top-btn"
        text="Search"
      />
    </div>
  )
}

export default Header