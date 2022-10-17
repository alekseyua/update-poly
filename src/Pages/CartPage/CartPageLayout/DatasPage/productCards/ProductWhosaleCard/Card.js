import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../../../../../../Views/CheckBox';
import Icon from '../../../../../../Views/Icon';
import Button from '../../../../../../Views/Button';
import { categoryCard1, closeJustIcon, closeRed } from '../../../../../../images';
import { useDebounce } from '../../../../../../helpers/useDebounce';

import style from '../../styles/cartpage.module.scss';
import classNames from 'classnames';

const Card = ({
  id,
  hideSales,
  product,
  total_item_price,
  condition = '',
  qty,
  selected,
  total_price,

  currency,
  is_packColor,
  is_packSize,
  is_packUrl,
  is_packPrice,
  cartitem_setUrl = '#',
  url,
  
  contextUpdateProductFromCard,
  deleteProductFromCart,
  decCounterProduct,
  incCounterProduct,

}) => {

  const { brand, color, image, in_stock_count, size, title, brand_id } = product;

  const [ valueInputNumber, setValueInputNumber ] = useState(qty);
  const [ idProduct, setIdProduct ] = useState(null);
  const [ selectedProduct, setSelectedProduct ] = useState(null);
  const [ deleteItem, setDeleteItem ] = useState(false)
  let debounceDeployInput = useDebounce(valueInputNumber, 1000);
  if (!product.image || product.image === '#') product.image = categoryCard1;
  // ***************************************************
  
  useEffect(()=>{
    setValueInputNumber(qty)
  },[qty])
  
  useEffect(()=>{
    idProduct?
      contextUpdateProductFromCard(idProduct, +debounceDeployInput, selectedProduct)
      : null
  },[debounceDeployInput])

  const styleDeleteItem = classNames({
    [style['product-card__wrapper']]: true,
    [style['product-card__wrapper--delete']]: deleteItem
  })
  console.log({url})

  return (
    <div
      className={styleDeleteItem}
    >
     <div className={style['product-card__wrapper-block']}>
        <div
          className={'product-card__selected-checkbox'}
        >
          <CheckBox
            checked={selected}
            className={'product__selected_checkbox'}
            onChange={(e) => {
              contextUpdateProductFromCard(id, qty, !e.checked)
            }}
          />
        </div>
        {/*фотография  */}
        <Link
          to={`/${url.split('/').pop()}`}//{is_packUrl ? is_packUrl : cartitem_setUrl}
        >
          <img
            src={image && image !== '#' ? image : categoryCard1}
            className={style['product-card__image-thumb']}
          />
        </Link>
        {/* инфо о товаре */}
        <div className={style['product-card__base_info']}>
          <Link
            className={style['product-card__base-info-title-link']}
            to={`/catalog?brands=${brand_id}&page=1&page_size=30`}
          >
            {brand}
          </Link>

          <Link
            to={is_packUrl ? is_packUrl : cartitem_setUrl}
          >
            <div className={style['product-card__base-info-title']}>{title}</div>
          </Link>
          <div className={style['product-card__base-info-size']}>Размер: {is_packSize ? is_packSize : size}</div>
          <div className={style['product-card__base-info-color']}>Цвет: {is_packColor ? is_packColor : color}</div>
          <div className={style['product-card__base-info-condition']}>
            Условие покупки:
            <span className={style['product-card__base-info-condition-content']}>
              <div>
                {condition}
              </div>
            </span>
          </div>
        </div>

        <Button
          onClick={() => {            
            deleteProductFromCart(id)
          }}
          className={style['product-card__delete-mobile']}
          gxVariant={'text'}
          size="sm"
          circle
        >
          <Icon src={closeRed} className={style['product-card__delete-mobile-icon']} with = { 15 } height = { 15 }/>
        </Button>
      </div>
      {/* цена и скидки */}
      <div className={style['product-card__sales-info']}>
        <div className={style['product-card__sales-info-current-price']}>
          {is_packPrice ? is_packPrice : total_item_price} {currency}
        </div>
        {!hideSales ? (
          <div className={style['product-card__sales-info-wrapper-column']}>
            <div className={style['product-card__sales-info-terms']}>
              При заказе от 3 ед.
              <span className={style['product-card__sales-info-new-price']}>5 %</span>
            </div>
            <div className={style['product-card__sales-info-terms']}>
              При заказе от 5 ед.
              <span className={style['product-card__sales-info-new-price']}>10 %</span>
            </div>
          </div>
        ) : null}
      </div>

      {/* счетчик и остатки */}
      <div className={style['product-card__count']}>
        <div
          className={style['product-card__count-change-container']}
        >
          <div
            className={style['product-card__count-btn-wrapper']}
          >
            <Button onClick={() => decCounterProduct(id, qty, selected) } variant={'counter-btn'} slot={'prefix'}>
              -
            </Button>
          </div>
          <input 
            autoFocus
            type = {'number'}
            onFocus={e => e.currentTarget.select() }
            className={style['product-card__count-input']}
            value = {valueInputNumber}
            onChange={(e) =>{
              setIdProduct(id)
              setSelectedProduct(selected)
              setValueInputNumber(e.target.value)} }/>
          <div
            className={style['product-card__count-btn-wrapper']}
            >
            <Button
              id={id}
              disabled={qty === in_stock_count}
              // onChange={changeState}
              onClick={ () => incCounterProduct(id, qty, selected)}

              variant={'counter-btn'} 
              slot={'suffix'}
              >
              +
            </Button>
          </div>
        </div>
        {in_stock_count ? (
          <div className={style['product-card__count-text']}>Осталось: {in_stock_count} шт.</div>
        ) : null}
      </div>

        {/* общая стоимость и удалить с карзикы */}
      <div className={style['product-card__wrapper-block-right']}>
        <div className={style['product-card__current-currency']}>
          {total_price} {currency} 
          <br/>
        </div>
        <Button
          onClick={() => {
            setTimeout(()=>deleteProductFromCart(id),900);
            setDeleteItem(true)
          }
          }
          className={style['product-card__delete']}
          gxVariant={'text'}
        >
          <Icon slot={'icon-left'} src={closeJustIcon}  width={15} height={15} />
        </Button>
      </div>

    </div>
  );
};

export default React.memo(Card);
