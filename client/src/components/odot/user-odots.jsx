import React from 'react';
import { useQuery } from 'react-apollo';
import { FETCH_USER } from '../../graphql/queries';
import Odot from './odot';

function UserOdots() {

  const id = localStorage.getItem("user-id");
  const { loading, data } = useQuery(FETCH_USER, { variables: { id }})

  if (loading) {
    return null;
  } else {
    console.log(data.user.odots)
    return (
      <div className="user-odots">
        {data.user.odots.forEach(odot => (
          <Odot odot={odot} />
        ))}
      </div>
    )
  }
}

export default UserOdots;