import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { FETCH_DOT, FETCH_ODOT } from '../../graphql/queries';
import { DELETE_DOT, UPDATE_DOT } from '../../graphql/mutations'
import { BsXCircle, BsCheckCircle } from 'react-icons/bs';

function DotSettings(props) {
    const [title, setTitle] = useState(props.dot.title);
    const [detail, setDetail] = useState(props.dot.detail);
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
            variables: { id: props.dot.id, title, detail }
        });
    }

    function handleDelete() {
        deleteDot({
            variables: { odotId: props.odot.id, dotId: props.dot.id }
        });
    }

    if (loading) return null
    else {
        let dot = data.dot;
        return (
            <div className="dot-settings">
                <div 
                    className="dot-title"
                    style={{ height: '20%'}}
                >
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder={dot.title}
                        autoFocus
                        required
                    />
                    <input 
                        type="text"
                        value={detail}
                        onChange={e => setDetail(e.target.value)}
                        placeholder={ dot.detail > 0 ? dot.detail : 'details' }
                    />
                </div>
                <button onClick={title ? handleSubmit : null}>
                    <BsCheckCircle className="check" />
                </button>
                <button onClick={handleDelete}>
                    <BsXCircle className="x" />
                </button>
            </div>
        )
    }
}

export default DotSettings;