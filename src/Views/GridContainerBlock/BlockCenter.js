import React from "react";
import style from './styles/grid.module.scss';

const BlockCenter = ({children, ...props}) =>{
    return (
        <div
            className={style['grid__center']}
        >
            { children }
        </div>
    )
}

export default BlockCenter;