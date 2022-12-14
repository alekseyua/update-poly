import React from 'react';
import Text from '../../../helpers/Text';
import CheckBox from '../../../Views/CheckBox';
import { Link } from 'react-router-dom';
import { categoryCard1 } from '../../../images';
import SuccesMinOrder from '../../../Pages/CartPage/CartPageLayout/DatasPage/SuccesMinOrder';
import BlockLine from '../../../Pages/CartPage/CartPageLayout/DatasPage/BlockLine';
import ToolTip from '../../ToolTip';

import style from '../styles/index.module.scss';

const CardWoasale = ({
  changeAgreement,
  currency,
  title,
  is_performed,
  condition,
  items,
  isVisibleLine }) => {

  return (
    <div className={style['wrapper-woosale']}>
      <SuccesMinOrder success={is_performed} messenge={condition} />
      {items.map((el) => {

        const {
          change_agreement,
          color,
          id,
          image,
          old_price,
          price,
          qty,
          size,
          product,
          url,
        } = el;

        return (
          <div className={style['order-card__wrapper']} key={id}>
            <div className={style['order-card__inner']}>
              <div className={style['order-card__imgage']}>
                <div className={style['order-card__imgage-inner']}>
                  <Link to={url.split('/').pop()}>
                    <div
                      className={style['order-card__img']}
                      style={!!product?.image ? { backgroundImage: `url(${product?.image})` }
                        : !!image ? { backgroundImage: `url(${image})` }
                          : { backgroundImage: `url(${categoryCard1})` }}
                    ></div>
                  </Link>
                </div>
              </div>

              <div className={style['order-card__content-card']}>
                <Link to={url}>
                  <div className={style['order-card__content-card-title']}>{product?.title}</div>
                </Link>
                <div className={style['order-card__content-card-brand']}>{product?.brand}</div>

                <div className={style['order-card__content-card-info']}>
                  <div className={style['order-card__content-card-info-inner']}>
                    <div className={style['order-card__content-card-info-size']}>
                      <span>
                        <Text text={'size'} />
                        :&nbsp;
                      </span>{' '}
                      {size}
                    </div>
                    <div className={style['order-card__content-card-info-color']}>
                      <span>
                        <Text text={'color'} />
                        :&nbsp;
                      </span>{' '}
                      {color}
                    </div>
                    <div className={style['order-card__content-card-info-agree']}>
                      <ToolTip
                        content="???????????????? ?????????? ?????????? ???????????? ???? ?????????? ????, ???? ?? ???????????? ?????????? ??/?????? ?????????????? ?? ?????????????????????? ?????????????? ????????????. ???? ???????????????? ?? ?????????????????????? ?? ???????????? ?????????????? ???????? ??????????."
                        placement="top"
                        className={style['ordering-card__tooltip']}
                      >
                        <CheckBox
                          checked={change_agreement}
                          onChange={e => changeAgreement(e, id, qty)}
                          label={'???????????????? ???? ????????????'}
                          classNameLabel={style['order-card__change-text']}
                        />
                      </ToolTip>
                    </div>
                  </div>
                  <div className={style['order-card__content-card-price-wrapper']}>
                    <div className={style['order-card__content-card-amount']}>
                      <span>
                        <Text text="count" />
                        :&nbsp;
                      </span>
                      {qty}&nbsp;????.
                    </div>
                    <div className={style['order-card__content-card-price']}>
                      <span>
                        {' '}
                        <Text text="price" />
                        :&nbsp;
                      </span>
                      <div
                        className={style['order-card__content-card-price-inner']}
                      >
                        <span>
                          <span className={style['order-card__content-card-price--color']}>{price.toFixed(2)}</span>&nbsp;
                          {currency}
                        </span>
                        {old_price ? (
                          <span className={style['order-card__content-card-price--old']}>
                            {old_price} {currency}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className={style['order-card__content-card-price']}>
                      <span>
                        {' '}
                        <Text text="total" />
                        :&nbsp;
                      </span>
                      <span>
                        <span className={style['order-card__content-card-price--color']}>{(price * qty).toFixed(2)}</span>&nbsp;
                        {currency}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className={style['order-card__content-card-inner-price']}>
              <div className={style['order-card__content-card-amount-mob']}>
                <span>
                  <Text text="count" />
                  :&nbsp;
                </span>
                {qty}&nbsp;????.
              </div>
              <div className={style['order-card__content-card-price-mob']}>
                {' '}
                <span>
                  {' '}
                  <Text text="price" />
                  :&nbsp;
                </span>
                <span>
                  <span className={style['order-card__content-card-price--color']}>{price}</span>&nbsp;
                  {currency}
                </span>
                {old_price ? (
                  <span className={style['order-card__content-card-price-mob--old']}>
                    {old_price} {currency}
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
                  <span className={style['order-card__content-card-price--color']}>{(price * qty).toFixed(2)}</span>&nbsp;
                  {currency}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      {isVisibleLine && <BlockLine />}
    </div>
  );
};

export default React.memo(CardWoasale);