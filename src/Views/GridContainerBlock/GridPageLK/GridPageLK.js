import React from 'react';
import style from '../styles/grid.module.scss'

const GridPageLK = ({ children }) => {

    return (
        <div
            className={style['block-page__grid-container-lk']}
        >
            {children}
        </div>
    )
}

export default GridPageLK;