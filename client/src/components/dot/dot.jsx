import React, { useState } from 'react';
import { useSpring, animated, interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useQuery, useMutation } from 'react-apollo';
import { FETCH_DOT } from '../../graphql/queries';
import { UPDATE_DOT } from '../../graphql/mutations';
import { BsGear, BsCheckCircle, BsCircle } from 'react-icons/bs';
import Modal from '../modal/modal';
import DotSettings from './dot-settings';
import './dot.css';

function Dot(props) {
  
  const [complete, setComplete] = useState(props.dot.complete);
  const [openModal, setOpenModal] = useState(false);
  const { loading, data } = useQuery(FETCH_DOT, { variables: { id: props.dot.id }})
  const [updateDot] = useMutation(UPDATE_DOT, {
    update(cache, { data }) {
      cache.writeQuery({
        query: FETCH_DOT,
        variables: { id: props.dot.id },
        data: { dot: data.updateDot }
      })
    }
  });

  function handleComplete() {
    setComplete(!complete);
    updateDot({
      variables: { id: props.dot.id, complete }
    })
  }
  
  function Slide({item}) {
    const [spring, setSpring] = useSpring(() => ({
      opacity: 1, zIndex: '0', scale: '1', x: 0, y: 0, bg: 'linear-gradient(120deg, #cccccc 0%, #cccccc 100%)'
    }))
    const bind = useDrag(({ down, movement: [dx,] }) => {
      if (down) {
        if (dx > 40) {
          if (dx < 150) setSpring({ zIndex: "1", scale: '1.01', x: dx, y: 0, opacity: 1, bg: 'linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)'  })
        } else if (dx < -40) {
          if (dx > -150) setSpring({ zIndex: "1", scale: '1.01', x: dx, y: 0, opacity: 1, bg: 'linear-gradient(120deg, #cccccc 0%, #cccccc 100%)'  })
        } else {
          setSpring({ zIndex: "1", scale: '1.01', y: 0, opacity: 1 })
        }
      }
      else {
        setSpring({ zIndex: "0", scale: '1', x: 0, y: 0, opacity: 1 })
        if (dx < -150) {
          setOpenModal(true);
        }
        if (dx > 150) {
          handleComplete();
        }
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
        {openModal ? <Modal show={openModal} setShow={val => setOpenModal(val)} component={<DotSettings dot={data.dot} odot={props.odot}/>} /> : null}
      </animated.div>
    );
  }  

  if (loading) return null;
  else {
    return (
      <div>
        <Slide item={ 
          <div className="dot-content">
            <div onClick={handleComplete}>
              {complete ? <BsCheckCircle/> : <BsCircle />}
            </div>
            <div>
              <div className="dot-title">
                {data.dot.title}
              </div>
              <div className="dot-detail">
                {data.dot.detail}
              </div>
            </div>
          </div> 
          }
        />
      </div>
    )
  }
} 

export default Dot;