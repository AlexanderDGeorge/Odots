import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
      <div className="session">
        <form className="session-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label htmlFor="name">Name</label>
            <input type="text"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
                required
            />
            <label htmlFor="email">Email</label>
            <input type="text"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <label htmlFor="password">Password</label>
            <input type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
            <p>Already have an account? <Link to="/login">Log In</Link></p>
        </form>
      </div>
  )
}

export default Register;