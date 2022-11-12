import React, { useState } from 'react';
import { categoryCard1} from '../../../images';
import Text from '../../../helpers/Text';
import CheckBox from '../../../Views/CheckBox';
import { Link } from 'react-router-dom';
import { ROLE } from '../../../const';
import ToolTip from '../../ToolTip';

import style from '../styles/index.module.scss';

const CardDropAndRetail = ({
  changeAgreement,
  currency,
  count,
  role,
  el, 
}) => {
const id = el.id;

return (


        <div className={style["order-card__wrapper"]}>
          <div className={style["order-card__inner"]}>

            <div className={style["order-card__imgage"]}>

              <div className={style["order-card__imgage-inner"]}>
                <Link
                  to={el?.url? el.url.split('/').pop() : '/catalog' }
                >
                  <div className={style["order-card__img"]} style={ 
                      !!el?.product?.image? 
                        {backgroundImage: `url(${ el.product.image })` } 
                        : el?.image?
                          {backgroundImage: `url(${ el.image })`} 
                          :{ backgroundImage: `url(${categoryCard1})` }}></div>
                </Link>
              </div>
            </div>

            <div className={style["order-card__content-card"]}>
              <div className={style["order-card__content-card-title"]}>{el?.product?.title? el?.product?.title : el.title}</div>
              <div className={style["order-card__content-card-brand"]}>{el?.product?.brand? el?.product?.brand : el.brand}</div>

              <div className={style["order-card__content-card-info"]}>
                <div className={style["order-card__content-card-info-inner"]}>
                  <div className={style["order-card__content-card-info-size"]}><span><Text text={'size'} />:&nbsp;</span> {el.size}</div>
                  <div className={style["order-card__content-card-info-color"]}><span><Text text={'color'} />:&nbsp;</span> {el.color}</div>
                  <div className={style["order-card__content-card-info-agree"]}>
                    <ToolTip
                      content="Заменить товар можно только на такой же, но в другом цвете и/или размере с соблюдением условия выкупа. Не забудьте в комментарии к товару указать свой выбор."
                      placement="top"
                      className={style['ordering-card__tooltip']}
                    >
                      <CheckBox
                        checked={ el.change_agreement }
                        onChange={ e => changeAgreement(e, id, el.qty)}
                        label={'Согласие на замену'}
                        classNameLabel={style['order-card__change-text']}
                          // <span className={style['ordering_card__change_text']}>Согласие на замену</span>
                      />
                    </ToolTip>
                  </div> 
                </div>

                <div className={style['order-card__content-card-price-wrapper']}>
                  <div className={style["order-card__content-card-amount"]}>
                    <span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.
                  </div>
                  <div className={style["order-card__content-card-price"]}>
                    <span> <Text text="price" />:&nbsp;</span>
                    <div
                        className={style['order-card__content-card-price-inner']}
                      >
                    <span>
                      <span className={style["order-card__content-card-price--color"]}>{el.price.toFixed(2)}</span>
                      &nbsp;{currency}
                    </span>
                    {
                      el.old_price ? (
                        <span className = { style['order-card__content-card-price--old'] }>
                          { el.old_price } { currency }
                        </span>
                      ) : null
                    }
                    </div>
                  </div>

                   <div className={style['order-card__content-card-price']}>
                    <span>
                      {' '}
                      <Text text="total" />
                      :&nbsp;
                    </span>
                    <span>
                      <span className={style['order-card__content-card-price--color']}>{(el.total_price).toFixed(2)}</span>&nbsp;
                      {currency}
                    </span>
                  </div>
                </div>
              </div>


            </div>

          </div>

          <div className={style["order-card__content-card-inner-price"]}>
            <div className={style["order-card__content-card-amount-mob"]}>
              <span><Text text="count" />:&nbsp;</span>{el.qty}&nbsp;шт.
            </div>
            <div className={style["order-card__content-card-price-mob"]}> 
            <span> <Text text="price" />:&nbsp;</span><span><span className={style["order-card__content-card-price--color"]}>
              {el.price.toFixed(2)}</span>&nbsp;{currency}</span>
              {el.old_price ? (
                <span className={style['order-card__content-card-price-mob--old']}>
                  {el.old_price} {currency}
                </span>
              ) : null}
            </div>

               <div className={style['order-card__content-card-price-mob']}>
                <span>
                  {' '}
                  <Text text="total" />
                  :&nbsp;
                </span>
                <span>
                  <span className={style['order-card__content-card-price--color']}>{(el.total_price).toFixed(2)}</span>&nbsp;
                  {currency}
                </span>
              </div>
          </div>
        </div>

    )

    
  // );
};

export default React.memo(CardDropAndRetail);
