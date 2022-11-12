import React from 'react';
import style from '../styles/grid.module.scss';

const BlockAddAddressCell = ({ children, variant }) => {
    const getStyle = action => {
        switch(action){
            case 'container':
                return style['block-add-address__cell--container'];
            default: 
                return style['block-add-address__cell']; 
        }
    }

    return <div
        className = { getStyle(variant) }
    >{children}</div>
}

export default BlockAddAddressCell;