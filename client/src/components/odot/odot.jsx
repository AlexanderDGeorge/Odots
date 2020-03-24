import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { FETCH_ODOT, FETCH_USER } from '../../graphql/queries';
import { BsXCircle } from 'react-icons/bs';
import { UPDATE_ODOT, DELETE_ODOT } from '../../graphql/mutations';
import NewDot from '../dot/new-dot';
import Dot from '../dot/dot';
import './odot.css';

function Odot(props) {

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("white");
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

  useEffect(() => {
    if (data) setColor(determineColor())
  }, [data])

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

  function determineColor() {
    // animate with react spring later
    let dots = data.odot.dots;
    if (dots.length === 0) { 
      return "white"
    } else {
      let complete = 0;
      dots.forEach(dot => { if (dot.complete) complete++ })
      const total = ( complete / dots.length ) * 500;
      const g = total;
      const r = total > 250 ? 500 - total : 250; 
      return `rgb(${r}, ${g}, 0)`
    }
  }

  if (loading) {
    return null;
  } else {
    const odot = data.odot;
    const headerColor = determineColor();
    return (
      <div className="odot">
        <div 
          className="odot-header"
          style={{ backgroundColor: color}}
        >
          <input
            className="odot-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={title ? handleSubmit : null}
            placeholder={odot.title}
            required
          />
          <BsXCircle className="x" onClick={handleDelete}/>
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