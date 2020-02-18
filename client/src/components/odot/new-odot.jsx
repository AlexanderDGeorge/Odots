import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { NEW_ODOT } from '../../graphql/mutations';
import AddLogo from '../logos/add-logo';
import './odot.css';
import { FETCH_USER } from '../../graphql/queries';

function NewOdot() {
  const id = localStorage.getItem("user-id")
  const [newOdot] = useMutation(NEW_ODOT, {
    update(cache, { data }) {
      cache.writeQuery({
        query: FETCH_USER,
        variables: { id },
        data: { user: data.newUserOdot }
      })
    }
  });
  const [title, setTitle] = useState("");

  function handleSubmit() {
    newOdot({
      variables: { title }
    })
  }

  return (
    <div className="odot">
      <div className="odot-side">
        <div className="odot-logo">
          <AddLogo />
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
          placeholder="Create an ODOT"
          required
        />
      </div>
    </div>
  )
}

export default NewOdot;
