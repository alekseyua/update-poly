import React, { useEffect, useState } from 'react';
import DeliveryLayout from './DeliveryLayout';

const DeliveryLayoutContainer = ({ breadcrumbs, role, title, components }) => {

    const [whosaleData, setWhosaleData] = useState('')
    const [retailData, setRetailData] = useState('')
    const [dropData, setDropData] = useState('');
    useEffect(() => {
        !!components ? (
            setWhosaleData(components[0]?.children[0]),
            setRetailData(components[0]?.children[2]),
            setDropData(components[0]?.children[1])
        ) : null
    }, [components])

    return (
        <>
            <DeliveryLayout
                breadcrumbs={breadcrumbs}
                role={role}
                title={title}
                whosaleData={whosaleData}
                retailData={retailData}
                dropData={dropData}
            />
        </>
    )
}

export default DeliveryLayoutContainer;