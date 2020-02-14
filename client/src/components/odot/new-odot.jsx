import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { NEW_ODOT } from '../../graphql/mutations';
import './odot.css';

function NewOdot() {
  const [newOdot] = useMutation(NEW_ODOT, {
    update(cache, { data: { newOdot }}) {
      cache.writeQuery({
        data: { odot: newOdot }
      })
    }
  });
  const [title, setTitle] = useState("");

  function handleSubmit() {
    newOdot({
      variables: { title: title.toUpperCase() }
    });
    setTitle("");
  }

  return (
    <div className="odot">
      <div className="odot-side">
        <div className="odot-logo">
        </div>
        <div className="odot-border">
        </div>
      </div>
      <div className="odot-title">
        <input 
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleSubmit}
          placeholder="Create an ODOT"
          required
        />
      </div>
    </div>
  )
}

export default NewOdot;