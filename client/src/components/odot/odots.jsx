import React from 'react';
import { useQuery } from 'react-apollo';
import { FETCH_USER } from '../../graphql/queries';
import Odot from './odot';
import NewOdot from './new-odot';
import './odot.css';

function Odots(props) {

    const { odotId } = props;
    const { loading, data } = useQuery(FETCH_USER)

    if (loading) {
        return null;
    } else {
        if (data.user) {
        return (
            <div className="odots">
                {data.user.odots.map(odot => (
                    <Odot odot={odot} key={odot.id}/>
                ))}
                <NewOdot />
            </div>
        )} else {
            return null;
        }
    }
}

export default Odots;