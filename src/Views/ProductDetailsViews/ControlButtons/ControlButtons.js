import React from 'react';
import classNames from 'classnames';
import { ROLE } from '../../../const';
import { shoppingIcon } from '../../../images';
import Button from '../../Button';
import Icon from '../../Icon';

import style from './style/controlbuttons.module.scss';
import Text from '../../../helpers/Text';

const ControlButtons = ({
    stateInStockeBtn,
    colorBtnClick,
    in_cart_count,
    is_collection,
    countInBtn,
    cloneCart,
    productId,
    modalView,
    role,
    url,
    
    linkToProductPage,
    addToCartProduct,

}) => {
   
    if (!!in_cart_count) {
        return (
            <div className={style['prodpage-control-buttons__container']}>
                <div className={style['prodpage-control-buttons__add-to-cart-container']}>
                    <Button
                        disabled={in_cart_count > 1 ? false : in_cart_count === 1 ? true : stateInStockeBtn}
                        onClick={(e) => {
                            cloneCart(e)
                            addToCartProduct( -1, true, productId );
                        }}
                        className={style['prodpage-control-buttons__descrement-button']}
                    >
                        -
                    </Button>
                    <p className={classNames({
                        [style['prodpage-control-buttons__inner-button']]:true,
                        [style[colorBtnClick]]: !!colorBtnClick
                    })}>
                        <Icon
                            slot="icon-left"
                            src={shoppingIcon}
                            width={25}
                            height={25}
                        />
                        <span
                            className={style['prodpage-control-buttons__info-in-cart']}
                        > в корзине: {countInBtn} {is_collection && role === ROLE.WHOLESALE ? 'ряд(а)' : 'шт.'}</span>
                    </p>
                    <Button
                        disabled={stateInStockeBtn}
                        onClick={(e) => {
                            cloneCart(e)
                            addToCartProduct( 1, false, productId );
                        }}
                        className={style['prodpage-control-buttons__increment-button']}
                    >
                        +
                    </Button>
                </div>
                {linkToProductPage(url, modalView)}
            </div>
        );
    } else {
        return (
            <div className={style['prodpage-control-buttons__container']}>
                <div className={style['prodpage-control-buttons__add-to-cart-container--fierst']}>
                    <Button
                        disabled={stateInStockeBtn}
                        onClick={(e) => {
                            cloneCart(e)
                            addToCartProduct( 1, false, productId );
                        }}
                        className={style['prodpage-control-buttons__fierst-add-to-cart']}
                    >
                        <Icon
                            slot="icon-left"
                            src={shoppingIcon}
                            pointerEvents={'none'}
                            width={25}
                            height={25}
                        />
                        <div
                            className={style['prodpage-control-buttons__text-button']}
                        >
                            { Text({text: 'add-to-cart'}) }
                        </div>
                    </Button>
                </div>
                {linkToProductPage(url, modalView)}
            </div>
        )
    }
}

export default ControlButtons;