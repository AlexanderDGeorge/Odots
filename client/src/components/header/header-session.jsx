import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { IS_LOGGED_IN } from '../../graphql/queries';
import Session from '../session/session';
import Modal from '../modal/modal';

function HeaderSession(props) {

    const {loading, data} = useQuery(IS_LOGGED_IN);
    const [showSession, setShowSession] = useState(false);

    if (loading) return null;
    else {
        if (data.isLoggedIn) {
            return (
                <div className="header-session">
                    <button className="session-button" onClick={() => setShowSession(true)}>Logout</button>
                    {showSession ? <Modal show={showSession} setShow={val => setShowSession(val)} component={<Session />} /> : null }
                </div>
            )
        } else {
            return (
                <div className="header-session">
                    <button className="session-button" onClick={() => setShowSession(true)}>Login</button>
                    <button className="session-button" onClick={() => setShowSession(true)}>Register</button>
                    <button className="session-button" onClick={() => setShowSession(true)}>Demo</button>
                    {showSession ? <Modal show={showSession} setShow={val => setShowSession(val)} component={<Session />} /> : null }
                </div>
            )
        }
    }
}

export default HeaderSession;