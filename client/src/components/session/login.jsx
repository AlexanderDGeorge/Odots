import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from 'react-apollo';
import { LOGIN_USER } from '../../graphql/mutations';

function Login(props) {
  const { demo } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const client = useApolloClient();
  const history = useHistory();

  useEffect(() => {
    if (demo) {
        setEmail("alex@alex.com");
        setPassword("password");
    }
  }, [demo])

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
    <form className="session-form" onSubmit={handleSubmit}>
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