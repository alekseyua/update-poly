import React from 'react';

import style from '../styles/grid.module.scss';

const CollPageRight = ({ children }) => {

    return (
        <div
        className={style['block-page__right-side']}
    >
        {children}
    </div>
    )
}

export default CollPageRight;