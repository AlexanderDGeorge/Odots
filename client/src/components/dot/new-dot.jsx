import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { NEW_DOT } from '../../graphql/mutations';
import { FETCH_ODOT } from '../../graphql/queries';
import { BsPlus } from 'react-icons/bs';

function NewDot(props) {
  const [newDot] = useMutation(NEW_DOT, {
    update(cache, { data }) {
      cache.writeQuery({
        query: FETCH_ODOT,
        variables: { id: props.odot.id },
        data: { odot: data.newOdotDot }
      })
    }
  });
  const [title, setTitle] = useState("");

  function handleSubmit() {
    newDot({
      variables: { title, odotId: props.odot.id, complete: false }
    })
    setTitle("");
  }

  return (
    <div className="dot">
      <BsPlus className="dot-add"/>
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
      <div>
        
      </div>
    </div>
  )
}

export default NewDot;