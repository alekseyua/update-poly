import React from 'react';
import style from '../styles/grid.module.scss'

const CollPageLeft = ({ children }) => {

    return (
        <div
            className={style['block-page__left-side']}
        >
            {children}
        </div>
    )
}

export default CollPageLeft;