import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import AsyncComponent from '../../helpers/asyncComponent';
import Text from '../../helpers/Text';
import Button from '../Button';
import Icon from '../Icon';
import {
  productDiscount,
  productNew,
  productHit,
  favoriteIcon,
  favoriteIconNew,
  favoriteFilledIcon,
  defaultImageCard,
} from '../../images';

import style from './productCard.module.scss';

const AsyncSlider = AsyncComponent(() => {
  return import('./Slider');
});

const ProductCard = (props) => {
  const {
    swapperDisabled,
    title,
    id,
    url,
    brand,
    prices,
    stock,
    colors,
    images = [],
    isSales,
    isNew,
    isHit,
    addLikeProductCard,
    removeLikeProductCard,
    handleQuickView=()=>{},
    sizes,
    currency,
    favorite,
  } = props;

  // console.log( {favorite})
  return (
    <div       
      className={[style['product-card']]}
    >
        <div className={style['product-card__wrap']}>
        <div className={style['product-card__top']}>
          <div className={'product_card-hide_hydrate'}>
            <div className={style['product-card__tags']}>
              {isSales ? (
                <div className={style['product-card__tag']}>
                  <img
                    width={'20px'}
                    height={'20px'}
                    src={productDiscount}
                    alt={Text({ text: 'sale' })}
                  />
                </div>
              ) : null}
              {isNew ? (
                <div className={style['product-card__tag']}>
                  <img
                    width={'20px'}
                    height={'20px'}
                    src={productNew}
                    alt={Text({ text: 'new' })}
                  />
                </div>
              ) : null}
              {isHit ? (
                <div className={style['product-card__tag']}>
                  <img
                    width={'20px'}
                    height={'20px'}
                    src={productHit}
                    alt={Text({ text: 'hit' })}
                  />
                </div>
              ) : null}
            </div>
          </div>

          {stock ? (
            <div className={style['product-card__stock']}>{Text({ text: 'inStock' })}</div>
          ) : (
            ''
          )}
          {swapperDisabled ? (
            <img src={images[0]} alt={'default image'} />
          ) : (
            <AsyncSlider 
              url={url} 
              images={images} 
              id={id}
             />
          )}
          <div className={style['product-card__head']}>
            <h6 className={style['product-card__brand']}>{brand}</h6>
            <Button
              variant="text"
              className={classNames({
                [style['product-card__favorite']]: true,
              })}
              onClick={() => {
                favorite?
                removeLikeProductCard(id)
                :addLikeProductCard(id);
              }}
            >
              <div
              >
                <Icon src={favorite ? favoriteFilledIcon : favoriteIcon} />
              </div>
             
            </Button>
          </div>
          <h5 className={style['product-card__name']}>
            <Link to={url}>{title}</Link>
          </h5>
          <div className={style['product-card__prices']}>
            <div
              className={classNames({
                [style['product-card__price']]: true,
                [style['product-card__price--new']]: prices.old_price,
              })}
            >
              {prices.price} {currency}
            </div>
            {prices.old_price ? (
              <div className={style['product-card__price--old']}>
                {prices.old_price} {currency}
              </div>
            ) : null}
          </div>
        </div>

        <div className={style['product-card__bottom--sizes']}>
          <ul className={style['product-card__sizes']}>
            {sizes.map((el, i) => {
              return (
                <li
                  key={i}
                  className={style['product-card__sizes--item']}
                >{el.title}</li>
              );
            })}
          </ul>
        </div>
       
        <div className={style['product-card__bottom']}>
          <ul className={style['product-card__colors']}>
            {colors.map((el, i) => {
              return (
                <li
                  key={i}
                  className={style['product-card__colors--item']}
                  style={{ backgroundColor: el.color }}
                ></li>
              );
            })}
          </ul>
          <span onClick={()=>handleQuickView(id)} className={style['product-card__link']}>
            <Text text={'quickView'} />
          </span>
        </div>

       
        
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
