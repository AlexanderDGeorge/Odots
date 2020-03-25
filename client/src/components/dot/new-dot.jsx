import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { NEW_DOT } from '../../graphql/mutations';
import { FETCH_ODOT } from '../../graphql/queries';
import { BsPlus, BsCheckCircle, BsXCircle } from 'react-icons/bs';

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
  const [open, setOpen] = useState(false);

  function handleSubmit() {
    newDot({
      variables: { title, odotId: props.odot.id, complete: false }
    })
    setTitle("");
  }

  if (open) {
    return (
      <div className="dot">
        <form className="dot-title new-dot-form" onSubmit={title ? handleSubmit : () => setOpen(false)}>
          <input 
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="task"
            required
            autoFocus
          />
          <button type="submit">
              <BsCheckCircle onClick={title ? handleSubmit : null} className="check"/>
          </button>
          <button type="reset">
            <BsXCircle onClick={() => setOpen(false)} className="x" />
          </button>
        </form>
      </div>
    )
  } else {
    return (
      <div className="dot new-dot">
        <BsPlus 
          onClick={() => setOpen(true)}  
        />
      </div>
    )
  }

}

export default NewDot;