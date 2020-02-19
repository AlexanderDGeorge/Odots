import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { FETCH_ODOT } from '../../graphql/queries';

import './odot.css';
import OdotLogo from '../logos/odot-logo';
import { UPDATE_ODOT } from '../../graphql/mutations';
import NewDot from '../dot/new-dot';
import Dot from '../dot/dot';

function Odot(props) {

  const { loading, data } = useQuery(FETCH_ODOT, { variables: { id: props.odot.id }})
  const [updateOdot] = useMutation(UPDATE_ODOT);
  const [title, setTitle] = useState("");

  function handleSubmit() {
    updateOdot({
      variables: { id: props.odot.id, title }
    });
  }

  if (loading) {
    return null;
  } else {
    const odot = data.odot;
    return (
      <div className="odot">
        <div className="odot-side">
          <div className="odot-logo">
            <OdotLogo />
          </div>
          <div className="odot-border">
          </div>
        </div>
        <div className="odot-title">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={title ? handleSubmit : null}
            placeholder={odot.title}
            required
          />
        </div>
        <div className="odot-content"> 
          {odot.dots.map(dot => (
            <Dot dot={dot} key={dot.id} />
          ))}
          <NewDot />
        </div>
      </div>
    )
  }


}

export default Odot;