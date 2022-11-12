import React from "react";
import style from './styles/index.module.scss';

const SpinnerCenter = ({ children }) => {

    return <div
        className={style['spinner__center']}
    >{ children }</div>
}
export default SpinnerCenter;