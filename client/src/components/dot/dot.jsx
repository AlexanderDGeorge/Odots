import React, { useState } from 'react';
import { useSpring, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useQuery, useMutation } from 'react-apollo';
import { FETCH_DOT, FETCH_ODOT } from '../../graphql/queries';
import { UPDATE_DOT, DELETE_DOT } from '../../graphql/mutations';
import { BsGear, BsCheckCircle } from 'react-icons/bs';
import './dot.css';

function Dot(props) {
  
  const [title, setTitle] = useState("");
  const { loading, data } = useQuery(FETCH_DOT, { variables: { id: props.dot.id }})
  const [updateDot] = useMutation(UPDATE_DOT);
  // const [deleteDot] = useMutation(DELETE_DOT, {
  //   update(cache, { data }) {
  //     cache.writeQuery({
  //       query: FETCH_ODOT,
  //       variables: { id: props.odot.id },
  //       data: { odot: data.removeOdotDot }
  //     })
  //   }
  // });

  function handleSubmit() {
    updateDot({
      variables: { id: props.dot.id, title }
    })
  }

  // function handleDelete() {
  //   deleteDot({
  //     variables: { odotId: props.odot.id, dotId: props.dot.id }
  //   })
  // }

  function Slide({item}) {
    const [spring, setSpring] = useSpring(() => ({
      opacity: 1, zIndex: '0', scale: '1', x: 0, y: 0, bg: 'linear-gradient(120deg, #cccccc 0%, #cccccc 100%)'
    }))
    const bind = useDrag(({ down, movement: [dx,] }) => {
      if (down) {
        if (dx > 40) {
          if (dx < 150) setSpring({ zIndex: "1", scale: '1.01', x: dx, y: 0, opacity: 1, bg: 'linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)'  })
          // setSpring({ zIndex: "1", scale: '1.01', x: '150', y: 0, opacity: 1, bg: 'linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)'  })
        } else if (dx < -40) {
          if (dx > -150) setSpring({ zIndex: "1", scale: '1.01', x: dx, y: 0, opacity: 1, bg: 'linear-gradient(120deg, #cccccc 0%, #cccccc 100%)'  })
        } else {
          setSpring({ zIndex: "1", scale: '1.01', y: 0, opacity: 1 })
        }
      }
      else {
        // if (dx < -150) handleDelete();
        setSpring({ zIndex: "0", scale: '1', x: 0, y: 0, opacity: 1 })
      }
    })
    return (
      <animated.div
        {...bind()}
        className="slide-container"
        style={{
          background: spring.bg
        }}
      >
        <div className="slide-background">
          <BsCheckCircle />
          <BsGear />
        </div>
        <animated.div 
          style={{
            opacity: spring.opacity,
            zIndex: spring.zIndex,
            transform: interpolate([spring.x, spring.y, spring.scale], (x, y, s) => (
              `translate3d(${x}px, ${y}px, 0) scale(${s})`
            ))
          }}
          className="dot"
        >
          {item}
        </animated.div>
      </animated.div>
    )    
  }  

  if (loading) {
    return null;
  } else {
    let dot = data.dot;
    console.log(dot);
    return (
      <Slide item={ 
        <div className="dot-title">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            // onBlur={title ? handleSubmit : null}
            placeholder={dot.title}
            required
          />
        </div> }
      />
    )
  }
} 

export default Dot;