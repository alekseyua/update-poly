import React from "react";
import style from './style/brand.module.scss';

const BrandName = ({name}) => {

    return <p className={style['prodpage__namebrand']}>{name}</p>;
}

export default BrandName;