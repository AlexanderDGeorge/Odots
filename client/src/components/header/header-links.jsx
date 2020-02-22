import React from 'react';
import { Link } from 'react-router-dom';
import { BsGear, BsPerson } from 'react-icons/bs';

function HeaderLinks() {
  return (
    <div className="header-links">
      <Link to="/settings">
        <BsGear />
      </Link>
      <Link to="/session">
        <BsPerson />
      </Link>
    </div>
  )
}

export default HeaderLinks;