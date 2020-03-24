import React, { useState } from 'react';
import Register from './register.jsx';
import Login from './login.jsx';
import Logout from './logout';
import { useQuery } from 'react-apollo';
import { IS_LOGGED_IN } from '../../graphql/queries';

import './session.css';

function Session() {

    const [tab, setTab] = useState("Login");
    const { loading, data } = useQuery(IS_LOGGED_IN);

    function tabs() {
        return (
            <div className="session-tabs">
                <div className="session-tab" onClick={() => setTab("Login")}>Login</div>
                <div className="session-tab" onClick={() => setTab("Register")}>Register</div>
                <div className="session-tab" onClick={() => setTab("Demo")}>Demo</div>
            </div>
        )
    }

    function whichTab() {
        switch (tab) {
            case "Login": return <Login demo={false}/>
            case "Register": return <Register />
            case "Demo": return <Login demo={true}/>
            default: return <Login />
        }
    }

    if (loading) return null;
    else {
        if (data.isLoggedIn) return <Logout/>
        else {
            return <div className="session">
                {tabs()}
                {whichTab()}
            </div>
        }
    }

//   if (loading) {
//     return null;
//   } else {
//     if (data.isLoggedIn) {
//       return (
//         <Logout />
//       )
//     } else {
//       return(
//         <LogReg />
//       )
//     }
//   }
}

export default Session;