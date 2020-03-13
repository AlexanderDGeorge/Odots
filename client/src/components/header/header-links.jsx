import React, { useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import Session from '../session/session';
import Modal from '../modal/modal';

function HeaderLinks() {
  const [showSession, setShowSession] = useState(false);

  return (
    <div className="header-links">
        <BsPersonFill onClick={() => {setShowSession(true)}}/>
        {showSession ? <Modal show={showSession} setShow={val => setShowSession(val)} component={<Session />} /> : null }
    </div>
  )
}

export default HeaderLinks;