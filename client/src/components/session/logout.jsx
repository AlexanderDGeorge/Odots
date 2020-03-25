import React from 'react';
import { ApolloConsumer } from 'react-apollo';

function Logout() {

    function handleClick(e, client) {
        e.preventDefault();
        localStorage.removeItem("auth-token");
        client.writeData({ data: { isLoggedIn: false }})
    }

    return (
        <ApolloConsumer>
        {client => (
            <div className="logout nav-link" onClick={e => handleClick(e, client)}>
                Logout
            </div>        
        )}
        </ApolloConsumer>
    )
}

export default Logout;