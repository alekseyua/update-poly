import React from 'react';
import { favoriteFilledIcon, favoriteIcon } from '../../../images';
import Button from '../../Button';
import Icon from '../../Icon';
import Raiting from '../../Raiting/RaitingView';
import Sharing from '../Sharing';
import style from './style/sectionraitingandsharingandmwish.module.scss'

const SectionRaitingAndSharingAndMyWish = ({
    max,
    value,
    label,
    title,
    is_liked,
    productId,
    countRaiting,
    allCountPercent,
    addLikeProductCard,
    removeLikeProductCard,
}) => {

   
    return (
        <div
            className={style['prodpage__raitsharewish-container']}//{style['']}
        >
            <Raiting
                max={max}
                value={value}
                labal={label}
                ActiveStar = { allCountPercent }//?!чтобы показать общий рейтинг товара
                countRaiting={countRaiting}
                className = { style['prodpage__raiting-star--disable']}
                label = { 'Отзыв(ов)' }
            />
            <div
                className={style['prodpage__raitsharewish-inner']}
            >
                <Sharing
                    title={title}
                >
                </Sharing>

                <Button 
                    onClick={ () => is_liked? removeLikeProductCard(productId) : addLikeProductCard(productId) } 
                    className={style['prodpage__raitsharewish-button-btn']}
                >
                    <Icon src={is_liked ? favoriteFilledIcon : favoriteIcon} fill={'#a3a3a3'} width={20} height={20} />
                </Button>
            </div>
        </div>
    )
}

export default SectionRaitingAndSharingAndMyWish;