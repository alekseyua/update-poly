import React from 'react';
import style from './styles/grid.module.scss';

const WrapperBlock = ({ children, ...props }) => {
    return (
        <div 
            className={style['grid__wrapper']}
        >
            { children }
        </div>

    )
}

export default WrapperBlock;