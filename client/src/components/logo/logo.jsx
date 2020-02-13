import React, { useState } from 'react';
import {BsGear, BsPerson, BsCircle, BsDot} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import './logo.css';

function Logo() {

  const [open, setOpen] = useState(false);

  return (
    <div className="logo">
      <div
        className={open ? "outer-open" : "outer"}
        onClick={() => setOpen(!open)}
      ></div>
      <div className="inner" onClick={() => setOpen(!open)}>
        <div className={open ? "lines-open" : "lines"} id="line1">
          <Link to="/settings" className="logo-links" id={open ? "icon1" : "icon"}>
            <BsGear className="icon"/>
          </Link>
        </div>
        <div className={open ? "lines-open" : "lines"} id="line2">
          <Link to="/session" className="logo-links" id={open ? "icon2" : "icon"}>
            <BsPerson className="icon"/>
          </Link>
        </div>
        <div className={open ? "lines-open" : "lines"} id="line3">
          <Link to="/" className="logo-links" id={open ? "icon3" : "icon"}>
            <BsCircle className="combo-icon" />
            <BsDot className="combo-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logo;