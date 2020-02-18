import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { NEW_DOT } from '../../graphql/mutations';
import { FETCH_ODOT } from '../../graphql/queries';

function NewDot(props) {
  const [newDot] = useMutation(NEW_DOT, {
    update(cache, { data }) {
      cache.writeQuery({
        query: FETCH_ODOT,
        variables: { id: props.odotId },
        data: { odot: data.newOdotDot }
      })
    }
  });
  const [title, setTitle] = useState("");

  function handleSubmit() {
    newDot({
      variables: { title }
    })
  }

  return (
    <div className="dot">
      <div className="dot-logo"></div>
      <div className="dot-title">
        <input 
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={title ? handleSubmit : null}
          placeholder="Create a Dot"
          required
        />
      </div>
    </div>
  )
}

export default NewDot;