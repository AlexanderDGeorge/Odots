import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { FETCH_ODOT, FETCH_USER } from '../../graphql/queries';
import { BsTrash, BsCircle } from 'react-icons/bs';
import { UPDATE_ODOT, DELETE_ODOT } from '../../graphql/mutations';
import NewDot from '../dot/new-dot';
import Dot from '../dot/dot';
import './odot.css';

function Odot(props) {

  const [title, setTitle] = useState("");
  const { loading, data } = useQuery(FETCH_ODOT, { variables: { id: props.odot.id }})
  const [updateOdot] = useMutation(UPDATE_ODOT);
  const [deleteOdot] = useMutation(DELETE_ODOT, {
    update(cache, { data }) {
      cache.writeQuery({
        query: FETCH_USER,
        data: { user: data.removeUserOdot }
      })
    }
  });

  function handleSubmit() {
    updateOdot({
      variables: { id: props.odot.id, title }
    });
  }

  function handleDelete() {
    deleteOdot({
      variables: { id: props.odot.id }
    });
  }

  if (loading) {
    return null;
  } else {
    const odot = data.odot;
    return (
      <div className="odot">
        <div className="odot-header">
          <BsCircle className="odot-logo"/>
          <input
            className="odot-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={title ? handleSubmit : null}
            placeholder={odot.title}
            required
          />
          <BsTrash className="odot-trash" onClick={handleDelete}/>
        </div>
        <div className="odot-content">
          {odot.dots.map(dot => (
            <Dot dot={dot} odot={odot} key={dot.id}/>
          ))}
          <NewDot odot={odot}/>
        </div>
      </div>
    )
  }
}

export default Odot;