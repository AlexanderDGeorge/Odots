import React, { useState, useRef } from 'react';
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated, interpolate } from 'react-spring'
import { useQuery, useMutation } from 'react-apollo';
import { FETCH_ODOT, FETCH_USER } from '../../graphql/queries';
import { BsTrash, BsCircle } from 'react-icons/bs';
import { UPDATE_ODOT, DELETE_ODOT } from '../../graphql/mutations';
import NewDot from '../dot/new-dot';
import Dot from '../dot/dot';
import './odot.css';

function Odot(props) {

  const [title, setTitle] = useState("");
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

  // const fn = (order, down, originalIndex, curIndex, y) => index =>
  // down && index === originalIndex
  //   ? { y: curIndex * 50 + y, scale: 1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex' }
  //   : { y: order.indexOf(index) * 50, scale: 1, zIndex: '0', shadow: 1, immediate: false }

  // function DraggableList({ items }) {
  //   const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  //   const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  //   const bind = useDrag(({ args: [originalIndex], down, offset: [, y] }) => {
  //     const curIndex = order.current.indexOf(originalIndex)
  //     const curRow = clamp(Math.round((curIndex * 50 + y) / 50), 0, items.length - 1)
  //     const newOrder = swap(order.current, curIndex, curRow)
  //     setSprings(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
  //     if (!down) order.current = newOrder
  //   })
  //   return (
  //     <div style={{ height: items.length * 50 }}>
  //       {springs.map(({ zIndex, shadow, y, scale }, i) => {
  //         return <animated.div
  //           {...bind(i)}
  //           key={i}
  //           style={{
  //             zIndex,
  //             boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
  //             transform: interpolate([y, scale], (y, s) => {
  //             return `translate3d(0,${y}px,0) scale(${s})`})
  //           }}
  //           className="dot"
  //           children={items[i]}
  //         />
  //         })}
  //     </div>
  //   )
  // }

  if (loading) {
    return null;
  } else {
    const odot = data.odot;
    const items = odot.dots.map(dot => dot.title);
    return (
      <div className="odot">
        <div className="odot-header">
          <BsCircle className="odot-logo"/>
          <input
            className="odot-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={title ? handleSubmit : null}
            placeholder={odot.title}
            required
          />
          <BsTrash className="odot-trash" onClick={handleDelete}/>
        </div>
        <div className="odot-content">
          {odot.dots.map(dot => (
            <Dot dot={dot} odot={odot} key={dot.id}/>
          ))}
          {/* <DraggableList items={items}/> */}
          <NewDot odot={odot}/>
        </div>
      </div>
    )
  }
}

export default Odot;