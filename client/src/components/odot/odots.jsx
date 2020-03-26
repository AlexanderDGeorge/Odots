import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { FETCH_USER } from '../../graphql/queries';
import Odot from './odot';
import NewOdot from './new-odot';
import './odot.css';

function Odots() {

    const { loading, data } = useQuery(FETCH_USER);
    const history = useHistory();

    function filter() {
        const odotId = history.location.pathname.slice(7);
        if (odotId) { 
            return data.user.odots.filter(odot => 
                odot.id === odotId)
        } else {
            return data.user.odots 
        }
    }

    if (loading) { return null }
    else {
        return (
            <div className="odots">
                {filter().map(odot => (
                    <Odot odot={odot} key={odot.id}/>
                ))}
                <NewOdot />
            </div>
        )
    }
}

export default Odots;