import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from 'react-apollo';
import { LOGIN_USER } from '../../graphql/mutations';

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
      const { token, loggedIn, id } = data.data.login;
      localStorage.setItem("auth-token", token);
      localStorage.setItem("user-id", id);
      client.writeData({ data: { isLoggedIn: loggedIn } });
    });
    history.push("/");
  }

  return (
    <form className="session-form login" onSubmit={handleSubmit}>
      <input type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <input type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
        required
      />
      <button type="submit">Log In</button>
    </form>
  )
}

export default Login;