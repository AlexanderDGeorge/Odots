import React from 'react';
import Logo from '../logo/logo';

import './main.css'
import UserOdots from '../odot/user-odots';

function Main() {
  return (
    <div className="main">
      <Logo className="logo"/>
      <UserOdots className="user-odots"/>
    </div>
  )
}

export default Main;