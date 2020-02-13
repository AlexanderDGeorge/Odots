import React from 'react';
import { ApolloConsumer, useQuery } from 'react-apollo';
import { IS_LOGGED_IN } from '../../graphql/queries';

function Logout() {
  const { loading, data } = useQuery(IS_LOGGED_IN);

  if (loading) {
    return null;
  } else {
    if (data.isLoggedIn) {
      return (
        <ApolloConsumer>{client => (
          <div
            className="logout"
            onClick={ e => {
              e.preventDefault();
              localStorage.removeItem("auth-token");
              localStorage.removeItem("user-id")
              client.writeData({ data: { isLoggedIn: false } });
            }}>
              Logout
          </div>
        )}
        </ApolloConsumer>
      )
    } else {
      return (
        <div>
          Successfully Logged Out!
        </div>
      )
    }
  }
}

export default Logout;