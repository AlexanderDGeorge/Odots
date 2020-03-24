import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useApolloClient } from 'react-apollo';
import { REGISTER_USER } from '../../graphql/mutations';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useMutation(REGISTER_USER);
  const client = useApolloClient();
  const history = useHistory();

  function handleSubmit() {
    registerUser({
      variables: { name, email, password }
    }).then(data => {
      const { token, loggedIn } = data.data.login;
      localStorage.setItem("auth-token", token);
      client.writeData({ data: { isLoggedIn: loggedIn } })
    });
    history.push("/");
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <input type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="name"
        required
      />
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
      <button type="submit">Register</button>
    </form>
  )
}

export default Register;