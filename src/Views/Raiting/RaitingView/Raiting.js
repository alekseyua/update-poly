import React from 'react';
import Icon from '../../Icon';
import { starIcon } from '../../../images'

import style from './styles/raiting.module.scss';


const Raiting = ({max, ActiveStar, ...props})=>{

    const stars = Array.from({length: max}).map((_,i)=>i+1)
    return(
        <div
            className={style['raiting-star__container']}
        >
                {
                    stars.map((el,i)=>{
                        return (
                            <div 
                                key={`raiting-${i}`}
                                className={style['raiting-star__star']} 
                            >
                                <Icon src={starIcon} invert={ i < ActiveStar? '0%' : '45%' } />
                            </div>
                        )
                    })
                }
        </div>
    )
}

export default Raiting;