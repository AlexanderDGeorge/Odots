import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { IS_LOGGED_IN } from '../../graphql/queries';
import Session from '../session/session';
import Modal from '../modal/modal';
import Logout from '../session/logout';

function HeaderSession(props) {

    const {loading, data} = useQuery(IS_LOGGED_IN);
    const [open, setOpen] = useState(false);

    if (loading) return null;
    else {
        if (data.isLoggedIn) {
            return (
                <div className="header-session">
                    <button className="session-button" onClick={() => setOpen(true)}>Logout</button>
                    {open ? <Modal component={<Logout/>} setOpen={val => setOpen(val)}/> : null}
                </div>
            )
        } else {
            return (
                <div className="header-session">
                    <button className="session-button" onClick={() => setOpen(true)}>Login</button>
                    <button className="session-button" onClick={() => setOpen(true)}>Register</button>
                    <button className="session-button" onClick={() => setOpen(true)}>Demo</button>
                    {open ? <Modal component={<Session/>} setOpen={val => setOpen(val)}/> : null}
                </div>
            )
        }
    }
}

export default HeaderSession;