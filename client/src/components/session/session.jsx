import React, { useState } from 'react';
import Register from './register.jsx';
import Login from './login.jsx';
import Logout from './logout';
import Modal from '../modal/modal';
import { useQuery } from 'react-apollo';
import { IS_LOGGED_IN } from '../../graphql/queries';

import './session.css';

function Session() {

  const [login, setLogin] = useState(false);
  const { loading, data } = useQuery(IS_LOGGED_IN);

  function LogReg() {
    return(
      <div className="tab-box">
        <div className="tab-box-buttons">
          <button onClick={() => setLogin(false)}>Register</button>
          <div></div>
          <button onClick={() => setLogin(true)}>Log In</button>
        </div>
        {login ? <Login /> : <Register />}
      </div>
    )
  }

  if (loading) {
    return null;
  } else {
    if (data.isLoggedIn) {
      return (
        <Modal component={<Logout />}/>
      )
    } else {
      return(
        <Modal component={<LogReg />}/>
      )
    }
  }
}

export default Session;