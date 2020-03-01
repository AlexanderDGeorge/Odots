import React, { useEffect, useRef } from 'react';
import './modal.css';

// takes in a component prop (what you want to render inside the modal)

function Modal(props) {
  console.log(props.setShow)
  const show = props.show;
  const setShow = props.setShow;
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  })

  function handleClick(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      setShow(false);
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