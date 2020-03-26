import React from 'react';
import { useQuery } from 'react-apollo';
import { FETCH_USER } from '../../graphql/queries';
import Odot from '../odot/odot';
import NewOdot from '../odot/new-odot';

export default function Month() {

    const { loading, data } = useQuery(FETCH_USER);

    function getToday() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today.toString();
    }

    function getMonth() {
        let month = new Date();
        const dd = String(month.getDate()).padStart(2, '0');
        let mm = month.getMonth() + 2;
        let yyyy = month.getFullYear();
        if (mm > 12) { yyyy++; mm = mm - 12 }
        mm = String(mm).padStart(2, '0');
        month = yyyy + '-' + mm + '-' + dd;
        return month.toString(); 
    }

    function filter() {
        const today = getToday();
        const month = getMonth();
        return data.user.odots.filter(odot => 
            odot.date >= today && odot.date <= month)
    }

    if (loading) { return null }
    else {
        return (
            <div className="odots">
                {filter().map(odot => (
                    <Odot odot={odot} key={odot.id} />
                ))}
                <NewOdot />
            </div>
        )
    }
}