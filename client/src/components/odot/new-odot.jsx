import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { NEW_ODOT } from '../../graphql/mutations';
import './odot.css';
import { FETCH_USER } from '../../graphql/queries';
import { BsPlus } from 'react-icons/bs';

function NewOdot() {
  const [newOdot] = useMutation(NEW_ODOT, {
    update(cache, { data }) {
      cache.writeQuery({
        query: FETCH_USER,
        data: { user: data.newUserOdot }
      })
    }
  });
  const [title, setTitle] = useState("");

  function handleSubmit() {
    newOdot({
      variables: { title }
    })
    setTitle("");
  }

  return (
    <div className="odot">
      <div className="odot-header">
        <BsPlus className="odot-logo"/>
        <input
          className="odot-title" 
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={title ? handleSubmit : null}
          placeholder="Create an ODOT"
          required
        />
      </div>
      <div className="odot-content">

      </div>
    </div>
  )
}

export default NewOdot;
