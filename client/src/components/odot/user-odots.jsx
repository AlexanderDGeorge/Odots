import React from 'react';
import { useQuery } from 'react-apollo';
import { FETCH_USER } from '../../graphql/queries';
import Odot from './odot';
import NewOdot from './new-odot';
import './odot.css';

function UserOdots() {

  const id = localStorage.getItem("user-id");
  const { loading, data } = useQuery(FETCH_USER, { variables: { id }})

  if (loading) {
    return null;
  } else {
    return (
      <div className="user-odots">
        {data.user.odots.map(odot => (
          <Odot odot={odot} key={odot.id}/>
        ))}
        <NewOdot user={data.user}/>
      </div>
    )
  }
}

export default UserOdots;