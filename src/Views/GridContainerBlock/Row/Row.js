import React from 'react';
import classNames from 'classnames';

import style from '../styles/grid.module.scss';

const Row = ({ children }) => {
    return(
        <div 
            className={classNames({
                    [style['grid__row']]: true,
                    [className]: !!className        
                })}
        >
            {
                children
            }
        </div>
    )
}

export default Row;