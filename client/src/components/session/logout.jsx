import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { useHistory } from 'react-router-dom';

function Logout() {

    const history = useHistory();

    function handleClick(e, client) {
        e.preventDefault();
        localStorage.removeItem("auth-token");
        client.writeData({ data: { isLoggedIn: false }})
        history.push('/');
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