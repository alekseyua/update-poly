import React from 'react';

import style from '../styles/grid.module.scss';

const GridPageRightLK = ({ children }) => {

    return (
        <div
        className={style['block-page__right-side-lk']}
    >
        {children}
    </div>
    )
}

export default GridPageRightLK;