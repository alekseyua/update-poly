import Recat from 'react';

import style from './styles/container-collections.module.scss';

const BlockContainerCollections = ({
    children
}) => {

    return (
        <div
             className = { style['collections__container']}
        >{children}</div>
    )
}

export default BlockContainerCollections;