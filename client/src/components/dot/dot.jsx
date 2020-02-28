import React, { useState } from 'react';
import { useSpring, animated, interpolate } from 'react-spring';
import clamp from 'lodash-es/clamp'
import { useDrag, useGesture } from 'react-use-gesture';
import { useQuery, useMutation } from 'react-apollo';
import { FETCH_DOT, FETCH_ODOT } from '../../graphql/queries';
import { UPDATE_DOT, DELETE_DOT } from '../../graphql/mutations';
import { BsCircle, BsTrash } from 'react-icons/bs';
import './dot.css';

function Dot(props) {
  
  const [complete, setComplete] = useState(props.dot.complete);
  const [title, setTitle] = useState("");
  const { loading, data } = useQuery(FETCH_DOT, { variables: { id: props.dot.id }})
  const [updateDot] = useMutation(UPDATE_DOT);
  const [deleteDot] = useMutation(DELETE_DOT, {
    update(cache, { data }) {
      cache.writeQuery({
        query: FETCH_ODOT,
        variables: { id: props.odot.id },
        data: { odot: data.removeOdotDot }
      })
    }
  });

  function handleSubmit() {
    updateDot({
      variables: { id: props.dot.id, title }
    })
  }

  function handleComplete() {
    setComplete(!complete);
    updateDot({
      variables: { id: props.dot.id, title, complete }
    })
  }

  function handleDelete() {
    deleteDot({
      variables: { odotId: props.odot.id, dotId: props.dot.id }
    })
  }

  function Slide({item}) {
    const fn = down => {
      console.log(down)
      return down ? { scale: 1.1, zIndex: 1, shadow: 15, backgroundColor: "hotpink" } : { scale: 1, zIndex: 0, shadow: 1 }
    }
    const [spring, setSpring] = useSpring(() => ({}))
    const bind = useDrag(({ down, offset: [x,] }) => {
      console.log(x)
      setSpring(fn(down))
    })
    return (
      <animated.div 
        {...bind()}
        className="dot"
      >
        {item}
      </animated.div>
    )    
  }  

  if (loading) {
    return null;
  } else {
    let dot = data.dot;
    console.log(dot);
    return (
      <Slide />
    )
  }
} 

export default Dot;

{/* <div className="dot">
<BsCircle 
  className="dot-task"
  onClick={handleComplete}
/>
<div className="dot-title">
  <input
    className={complete ? "dot-line" : ""}
    type="text"
    value={title}
    onChange={e => setTitle(e.target.value)}
    onBlur={title ? handleSubmit : null}
    placeholder={dot.title}
    required
  />
</div>
<BsTrash 
  className="dot-trash"
  onClick={handleDelete}  
/>
</div> */}