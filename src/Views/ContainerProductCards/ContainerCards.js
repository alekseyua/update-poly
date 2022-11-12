import React from 'react';


import style from './styles/index.module.scss';

const ContainerCard = ({ children, ...props }) => {

    return (
        <div
            className={style['container-card__container']}
        >
            {children}
        </div>
    )
}

export default ContainerCard;