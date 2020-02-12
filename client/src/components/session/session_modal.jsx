import React, { useState } from 'react';

import './session.css';
import Login from './login';
import Register from './register';
import { useQuery, useApolloClient } from 'react-apollo';
import { IS_LOGGED_IN } from '../../graphql/queries';
import Logout from './logout';

function SessionModal() {

  const { data } = useQuery(IS_LOGGED_IN);
  const [login, setLogin] = useState(false);
  const client = useApolloClient();

  function LogReg() {
    if (login) {
      return <Login />;
    } else {
      return <Register />;
    }
  }

  function logout() {
    localStorage.removeItem("auth-token");
    client.writeData({ data: { isLoggedIn: false } });
  }
  console.log(data.isLoggedIn);

  if (data.isLoggedIn) {
    return (
      <div className="session-modal">
        <div className="tab-box">
          <Logout />
        </div>
      </div>
    )
  } else {
    return(
      <div className="session-modal">
        <div className="tab-box">
          <div className="tab-box-buttons">
            <button onClick={() => setLogin(false)}>Register</button>
            <div></div>
            <button onClick={() => setLogin(true)}>Log In</button>
          </div>
          {LogReg()}
        </div>
      </div>
    )
  }
}

export default SessionModal;