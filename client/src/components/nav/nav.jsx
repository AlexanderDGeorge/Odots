import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FiChevronRight, FiCircle } from 'react-icons/fi';
import './nav.css'
import { useQuery } from 'react-apollo';
import { FETCH_USER } from '../../graphql/queries';
import Logout from '../session/logout';

export default function Nav() {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const { loading, data } = useQuery(FETCH_USER);

    if (loading) return null;
    else return (
        <div className="nav">
            <Link className={active === 1 ? "active nav-link" : "nav-link"} onClick={() => setActive(1)} to="/today">Today</Link>
            <Link className={active === 2 ? "active nav-link" : "nav-link"} onClick={() => setActive(2)} to="/week">This Week</Link>
            <div className="nav-link" onClick={() => { setOpen(!open); setActive(0) }}>
                <FiChevronRight className={open ? "nav-open" : "nav-close"}/>
                Odots
            </div>
            {open ? <div className="nav-odots">
                {data.user.odots.map((odot, i) => { console.log(odot); return (
                    <div className={active === i + 3 ? "active nav-link" : "nav-link"} onClick={() => setActive(i + 3)} key={i}>
                        <FiCircle color={odot.color}/>
                        {odot.title}
                    </div>
                )})}
            </div> : null }
            <Logout className="nav-link"/>
        </div>
    )
}