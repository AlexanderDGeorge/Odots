import React from 'react';
import { ApolloConsumer } from 'react-apollo';

function Logout() {
  return (
    <ApolloConsumer>{client => (
      <div
        className="logout"
        onClick={ e => {
          e.preventDefault();
          localStorage.removeItem("auth-token");
          client.writeData({ data: { isLoggedIn: false } });
        }}>
      </div>
    )}
    </ApolloConsumer>
  )
}

export default Logout;