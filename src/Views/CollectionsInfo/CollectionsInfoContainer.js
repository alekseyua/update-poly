import React from 'react';
import CollectiionsInfo from './CollectionsInfo';

const CollectiionsInfoContainer = ({
    collections,
    title,
    
}) => {

    const sortCollection = (data) => {
        const newData = data.items.sort((a, b) => (a.size.id > b.size.id) ? 1 : -1)
        return newData
    }
    return (
        <CollectiionsInfo
            collections={collections}
            sortCollection={sortCollection}
            title={title}
        />
    )
}

export default CollectiionsInfoContainer;