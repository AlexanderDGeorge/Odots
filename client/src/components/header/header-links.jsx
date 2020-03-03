import React, { useState } from 'react';
import { BsGearFill, BsPersonFill } from 'react-icons/bs';
import Session from '../session/session';
import Modal from '../modal/modal';

function HeaderLinks() {
  const [showSettings, setShowSettings] = useState(false);
  const [showSession, setShowSession] = useState(false);

  return (
    <div className="header-links">
        <BsGearFill />
        <BsPersonFill onClick={() => {setShowSession(true)}}/>
        {showSettings ? <Modal show={showSettings} setShow={val => setShowSettings(val)} component={null} /> : null }
        {showSession ? <Modal show={showSession} setShow={val => setShowSession(val)} component={<Session />} /> : null }
    </div>
  )
}

export default HeaderLinks;