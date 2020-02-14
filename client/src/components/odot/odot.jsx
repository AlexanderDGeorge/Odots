import React from 'react';
import { useQuery } from 'react-apollo';
import { FETCH_ODOT } from '../../graphql/queries';

import './odot.css';

function Odot(props) {

  const { loading, data } = useQuery(FETCH_ODOT, { variables: { id: props.odot.id }})

  if (loading) {
    return null;
  } else {
    console.log(data)
    return (
      <div className="odot">
        
      </div>
    )
  }


}

export default Odot;