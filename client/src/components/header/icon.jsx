import React from 'react';
import { BsDot, BsCircleFill } from 'react-icons/bs'
import './header.css';

function Icon (props) {
  return (
    <div className="icon" onClick={props.handleClick}>
      <BsCircleFill fill={"white"} />
      <BsDot />
    </div>
  )
}

export default Icon;