import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './modal.css';

// takes in a component prop (what you want to render inside the modal)

function Modal(props) {

  const [show, setShow] = useState(true);
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  })

  function handleClick(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      setShow(false);
      history.push("/");
    }
  }

  return (
    <div className={show ? "modal show" : "modal"} >
      <div className="modal-box" ref={ref}>
        {props.component}
      </div>
    </div>
  )

}

export default Modal;