import React, { useState } from 'react';
import {BsGear, BsPerson, BsCircle, BsDot} from 'react-icons/bs'
import {useQuery} from 'react-apollo';
import { IS_LOGGED_IN } from '../../graphql/queries';
import './logo.css';
import SessionModal from '../session/session_modal';

function Logo() {

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="logo">
      <div
        className={open ? "outer-open" : "outer"}
        onClick={() => setOpen(!open)}
      ></div>
      <div className="inner" onClick={() => setOpen(!open)}>
        <div className={open ? "lines-open" : "lines"} id="line1">
          <BsGear id={open ? "icon1" : "icon"} />
        </div>
        <div className={open ? "lines-open" : "lines"} id="line2">
          <BsPerson id={open ? "icon2" : "icon"} onClick={() => setShow(true)} />
        </div>
        <div className={open ? "lines-open" : "lines"} id="line3">
          <BsCircle id={open ? "icon3" : "icon"} />
          <BsDot id={open ? "icon3" : "icon"} />
        </div>
      </div>
      {show ? <SessionModal /> : null}
    </div>
  );
}

export default Logo;