import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { FETCH_DOT } from '../../graphql/queries';
import { UPDATE_DOT } from '../../graphql/mutations';
import { BsCircle } from 'react-icons/bs';
import './dot.css';

function Dot(props) {
  
  const [title, setTitle] = useState("");
  const { loading, data } = useQuery(FETCH_DOT, { variables: { id: props.dot.id }})
  const [updateDot] = useMutation(UPDATE_DOT);

  function handleSubmit() {
    updateDot({
      variables: { id: props.dot.id, title }
    })
  }

  function handleComplete(complete) {
    complete = !complete;
    console.log(complete)
    updateDot({
      variables: { id: props.dot.id, title, complete }
    })
  }

  if (loading) {
    return null;
  } else {
    let dot = data.dot;
    let complete = dot.complete;
    console.log(dot);
    return (
      <div className="dot">
        <BsCircle 
          className="dot-task"
          onClick={() => handleComplete(complete)}
        />
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