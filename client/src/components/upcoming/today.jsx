import React from 'react';
import { useQuery } from 'react-apollo';
import { FETCH_USER } from '../../graphql/queries';
import Odot from '../odot/odot';
import Empty from './empty';

export default function Today() {

    const { loading, data } = useQuery(FETCH_USER);

    function getToday() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today.toString();
    }

    function filter() {
        const today = getToday();
        return data.user.odots.filter(odot => 
            odot.date === today)
    }

    if (loading) { return null }
    else {
        if (filter().length) {
            return (
                <div className="odots">
                    {filter().map(odot => (
                        <Odot odot={odot} key={odot.id} />
                    ))}
                </div>
            )
        } else {
            return (
                <Empty />
            )
        }
    }
}