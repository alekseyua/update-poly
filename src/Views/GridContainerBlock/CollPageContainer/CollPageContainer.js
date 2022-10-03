import React from 'react';
import style from '../styles/grid.module.scss'

const CollPageContainer = ({ children }) => {

    return (
        <div
            className={style['block-page__container']}
        >
            {children}
        </div>
    )
}

export default CollPageContainer;