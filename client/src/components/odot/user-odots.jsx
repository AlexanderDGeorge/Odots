import React from 'react';
import { useQuery } from 'react-apollo';
import { CUR_USER, FETCH_USER, IS_LOGGED_IN } from '../../graphql/queries';

function UserOdots() {
  const { loading, data } = useQuery(IS_LOGGED_IN);
  // const { loading, data } = useQuery(CUR_USER);

  if (loading){
    return null;
  } else {
    console.log(data);
    return (
      <div>
        
      </div>
    );
  }
}

export default UserOdots;