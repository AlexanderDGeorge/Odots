import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useMutation } from 'react-apollo';
import { NEW_ODOT } from '../../graphql/mutations';
import { FETCH_USER } from '../../graphql/queries';
import { BsPlus, BsCheckCircle, BsXCircle } from 'react-icons/bs';
import './odot.css';

function NewOdot() {
    const [newOdot] = useMutation(NEW_ODOT, {
        update(cache, { data }) {
        cache.writeQuery({
            query: FETCH_USER,
            data: { user: data.newUserOdot }
        })
        }
    });

    function getDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today.toString();
    }
    
    function handleSubmit(title, color, date) {
        newOdot({ variables: { title, color, date }})
    }
  
    function Card() {
        const [title, setTitle] = useState("");
        const [color, setColor] = useState("Red");
        const [date, setDate] = useState("");
        const [flipped, set] = useState(false);
        const { transform, opacity } = useSpring({
            opacity: flipped ? 1 : 0,
            transform: `perspective(6000px) rotateY(${flipped ? 180 : 0}deg)`,
            config: { mass: 5, tension: 500, friction: 80 }
        })
        return (
            <div className="card-container">
                <animated.div 
                    style={{ opacity: opacity.interpolate(o => 1 - o), transform, zIndex: opacity.interpolate(o => 1 - o) }}
                    onClick={() => set(true)}
                    className="front" 
                >
                <BsPlus />
                </animated.div>
                <animated.div 
                    style={{ opacity, transform: transform.interpolate(t => `${t} rotateY(180deg)`), zIndex: opacity }}
                    className="back" 
                >
                    <form className="new-odot-form" onSubmit={title ? () => handleSubmit(title) : null}>
                        <label htmlFor="title">Odot Title</label>
                        <input
                            name="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            autoFocus
                            required
                        />
                        <label htmlFor="color">Color</label>
                        <select name="color" onChange={e => setColor(e.target.value)}>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                        </select>
                        <label htmlFor="date">Date</label>
                        <input 
                            name="date"
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            min={getDate()}
                        />
                        <button type="submit">
                            <BsCheckCircle onClick={title ? () => handleSubmit(title, color, date) : null} className="check"/>
                        </button>
                        <button type="reset">
                            <BsXCircle onClick={() => set(false)} className="x"/>
                        </button>
                    </form>
                </animated.div>
            </div>
        )
    }

    return (
        <Card />
    )
}

export default NewOdot;