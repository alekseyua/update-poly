import React from 'react';
import Title from '../Title';

import style from './styles/card-collections.module.scss';


const CardCollectionView = ({
    title,

}) => {

    return (
        <div
            className={style['card-collections__container']}
        >
            <Title 
                type= { 'h4' }

            >{title}</Title>

        </div>
    )
}

export default CardCollectionView;