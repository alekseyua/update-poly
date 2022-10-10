import React from 'react';
import style from '../styles/grid.module.scss'

const GridPageLeftLK = ({ children }) => {

    return (
        <div
            className={style['block-page__left-side-lk']}
        >
            {children}
        </div>
    )
}

export default GridPageLeftLK;