import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../../../../../../Views/CheckBox';
import Text from '../../../../../../helpers/Text';
import Button from '../../../../../../Views/Button';
import { categoryCard1, closeJustIcon, closeRed } from '../../../../../../images';
import { ROLE } from '../../../../../../const';
import Icon from '../../../../../../Views/Icon';
import { useDebounce } from '../../../../../../helpers/useDebounce';

import style from '../../styles/cartpage.module.scss';
import classNames from 'classnames';

const defaultProductData = {
  brand: 'brand',
  color: 'color',
  id: 'id',
  in_stock_count: 'in_stock_count',
  size: 'size',
  title: 'title',
};

const ProductHorizontalCard = ({
  deleteProductFromCart,
  updateProductFromCart,
  is_collection,
  total_price,
  old_price,
  condition,
  currency,
  selected,
  product = defaultProductData,
  price,
  role,
  url,
  qty,
  id,

  decCounterProduct,
  incCounterProduct,
  contextUpdateProductFromCard,
  setTextInput,
  ...props
}) => {

  const { brand, color, id: productId, in_stock_count, size, title, image } = product;
  const [ valueInputNumber, setValueInputNumber ] = useState(qty);
  const [ idProduct, setIdProduct ] = useState(null);
  const [ selectedProduct, setSelectedProduct ] = useState(null);
  const [ deleteItem, setDeleteItem ] = useState(false)
  let debounceDeployInput = useDebounce(valueInputNumber, 1000);

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
          onChange={(e) => {
            console.log('e check box product card', e.checked)
            contextUpdateProductFromCard(id, qty, !e.checked)

            // const value = e.target.checked;
            // select !== value ? setSelect(!select) : null
            // if (value !== null && select !== value){
            //   setSelect(!select)
            //   updateProductFromCart({ 
            //     id: id,
            //     selected: value,
            //     qty: countProducts,
            //   });}
          }}
          />
        </div>

        <Link to={ `/${url.split('/').pop()}` }>
          <img src={image} className={style['product-card__image-thumb']} />
        </Link>
        <div className={style['product-card__base-info']}>
        
          <div className={style['product-card__base-info-brand']}>{ brand }</div>

          <Link className={style['product-card__base-info-title-link']} to={ `/${url}` }>
            <div className={style['product-card__base-info-title']}>{ title }</div>
          </Link>

          <div className={style['product-card__base-info-size']}>
            <Text text={'size'} />: { size }
          </div>
          
          <div className={style['product-card__base-info-color']}>
            <Text text={'color'} />: { color }
          </div>
          
          {
            role !== ROLE.RETAIL?
              is_collection?
                  <div className={style['product-card__base-info-size']}>
                    Условие покупки:
                    <div className={style['product-card__base-info-size-black']}>
                      { condition }
                    </div>
                  </div>
              : null
            :null
          }
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
          <Icon src={ closeRed } className={style['product-card__delete-mobile-icon']} with = { 15 } height = { 15 } />
        </Button>
      </div>
      <div className={style['product-card__sales-info']}> 
        <div>
          {
            old_price !== '0.00' ? (
              <div className={style['product-card__sales-info-current-price-empty']}>{ old_price }</div>
            ) : null
          }

          <div className={style['product-card__sales-info-current-price']}>
            { price } { currency }
          </div>
        </div>

        {/* {role === ROLE.RETAIL && old_price === '0.00' ? (    так было */}
        <div>
          {role === ROLE.RETAIL ? (
            <div className={style['product-card__sales-info-wrapper-column']}>
              <div className={style['product-card__sales-info-terms']}>
                При заказе от 3 ед.{' '}
                <span className={style['product-card__sales-info-new-price']}>5 %</span>
              </div>
              <div className={style['product-card__sales-info-terms']}>
                При заказе от 5 ед.{' '}
                <span className={style['product-card__sales-info-new-price']}>10 %</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
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
            onFocus={ e => e.currentTarget.select() }
            type = {'number'}
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
              onClick={ () => {
                console.log('click')
                incCounterProduct(id, qty, selected) }} 
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

export default React.memo(ProductHorizontalCard);

