import React from 'react';
import YouHaveAlreadyWatched from './YouHaveAlreadyWatched';

const YouHaveAlreadyWatchedContainer = ({
    youAlredyWatch, 
    currency
}) => {
    console.log({youAlredyWatch})
    return (
        <>
        {   
            youAlredyWatch?.results.length?
                <YouHaveAlreadyWatched
                    listAlreadySaw={youAlredyWatch.results}
                    currency={currency}
                />
                : null
        }
        </>
    )
}

export default YouHaveAlreadyWatchedContainer;