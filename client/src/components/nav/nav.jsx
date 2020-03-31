import React, { useState } from 'react';
import NavLinks from './nav-links';
import { FiMenu, FiBell } from 'react-icons/fi';
import './nav.css'

export default function Nav() {

    const width = window.innerWidth;
    const [open, setOpen] = useState(false);

    if (width < 500) {
        return <div className="nav">
            <FiMenu onClick={() => setOpen(!open)} />
            <FiBell />
            {open ? <NavLinks setOpen={val => setOpen(val)} /> : null}
        </div>
    } else {
        return <NavLinks />
    }
}