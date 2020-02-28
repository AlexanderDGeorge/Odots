import React from 'react';
import Header from '../header/header';
import UserOdots from '../odot/odots';
import './main.css'

function Main() {
  return (
    <div className="main orange">
      <Header className="header"/>
      <UserOdots className="odots"/>
    </div>
  )
}

export default Main;