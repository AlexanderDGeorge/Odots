import React from 'react';
import Header from '../header/header';
import UserOdots from '../odot/odots';
import Focus from '../focus/focus';
import './main.css'

function Main() {
  return (
    <div className="main orange">
      <Header className="header"/>
      <UserOdots className="odots"/>
      <Focus className="focus"/>
    </div>
  )
}

export default Main;