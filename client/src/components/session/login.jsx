import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useMutation, useApolloClient } from 'react-apollo';
import { LOGIN_USER } from '../../graphql/mutations';
import './session.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const client = useApolloClient();
  const history = useHistory();

  function handleSubmit() {
    loginUser({
      variables: { email, password }
    }).then(data => {
      const { token, loggedIn } = data.data.login;
      localStorage.setItem("auth-token", token);
      client.writeData({ data: { isLoggedIn: loggedIn } });
    });
    history.push("/");
  }

  return (
      <div className="session">
        <form className="session-form" onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <label htmlFor="email">Email</label>
            <input type="text"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
                required
            />
            <label htmlFor="password">Password</label>
            <input type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
          <button type="submit">Log In</button>
          <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
        </form>
      </div>
  )
}

export default Login;