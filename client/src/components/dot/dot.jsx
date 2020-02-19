import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { FETCH_DOT } from '../../graphql/queries';
import { UPDATE_DOT } from '../../graphql/mutations';

function Dot(props) {
  
  const { loading } = useQuery(FETCH_DOT, { variables: { id: props.dot.id }})
  const [updateDot] = useMutation(UPDATE_DOT);
  const [title, setTitle] = useState("");
  const dot = props.dot;

  function handleSubmit() {
    updateDot({
      variables: { id: dot.id, title }
    })
  }

  if (loading) {
    return null;
  } else {
    return (
      <div className="dot">
        <div className="dot-logo"></div>
        <div className="dot-title">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={title ? handleSubmit : null}
            placeholder={dot.title}
            required
          />
        </div>
      </div>
    )
  }




} 

export default Dot;