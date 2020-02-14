import React from 'react';
import { useQuery } from 'react-apollo';
import { FETCH_ODOT } from '../../graphql/queries';

import './odot.css';

function Odot(props) {

  const { loading, data } = useQuery(FETCH_ODOT, { variables: { id: props.odot.id }})
  const odot = props.odot;

  if (loading) {
    return null;
  } else {
    console.log(data)
    return (
      <div className="odot">
        <div className="odot-side">
          <div className="odot-logo">
          </div>
          <div className="odot-border">
          </div>
        </div>
        <div className="odot-title">
          {odot.title}
        </div>
      </div>
    )
  }


}

export default Odot;