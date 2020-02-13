import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { NEW_ODOT } from '../../graphql/mutations';

function NewOdot() {
  const [newOdot] = useMutation(NEW_ODOT);
  const [title, setTitle] = useState("");

  function handleSubmit() {
    newOdot({
      variables: { title }
    });
    setTitle("");
  }

  return (
    <div className="new-odot">
      <input 
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onBlur={handleSubmit}
        placeholder="Create an ODOT"
        required
      />
    </div>
  )
}

export default NewOdot;