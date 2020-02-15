import React from 'react';
import LinkLogo from '../logos/link-logo';

import './main.css'
import UserOdots from '../odot/user-odots';

function Main() {
  return (
    <div className="main">
      <LinkLogo className="logo"/>
      <UserOdots className="user-odots"/>
    </div>
  )
}

export default Main;