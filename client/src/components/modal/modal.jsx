import React, { useEffect, useRef, useState } from 'react';
import './modal.css';

// takes in a component prop (what you want to render inside the modal)

function Modal(props) {

    const [open, setOpen] = useState(true);
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    })

    function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
            props.setOpen(false);
        }
    }

    if (open && props.component) {
        return (
            <div className="modal">
                <div className="modal-box" ref={ref}>
                    {props.component}
                </div>
            </div>
        )
    } else {
        props.setOpen(false);
        return null
    }
}

export default Modal;