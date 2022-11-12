import React from 'react';
import CartViews from '../../../../../Views/CartViews';
import Text from '../../../../../helpers/Text';
import { ROLE } from '../../../../../const';
import {
  addressIcon,
  wallet,
  truck,
  statusWait,
  statusSend,
  statusWork,
  statusOrdered,
  statusPackage,
  statusClosed,
  statusReturn,
  statusCancel,
  toolTipIcon,
} from '../../../../../images';
import Icon from '../../../../../Views/Icon';
import Button from '../../../../../Views/Button';


import style from './styles/index.module.scss';

const OrderBaseDetails = ({
  payment_method,
  delivery_method,
  delivery_address,
  numberOrder,
  comment,
  discount,
  weight,
  status,
  currency,
  delivery_cost = 0,
  order_cost = 0,
  total_cost = 0,
  role,

  openModalPay,
  heandlerClickInfo,
}) => {
// console.log({delivery_address})
  // if (delivery_address) return (<></>);

  const {
    city,
    country,
    first_name,
    flat,
    house,
    id,
    last_name,
    middle_name,
    phone,
    post_code,
    profile,
    street,
  } = delivery_address;

  const getIconFromStatus = (id) => {
    const statusIcons = {
      work: statusWork,
      created: statusOrdered,
      sended: statusSend,
      payment_waiting: statusSend,
      in_process: statusWork,
      packaging: statusPackage,
      delivery_payment_waiting: statusWait,
      closed: statusClosed,
      canceled: statusCancel,
      return: statusReturn,
      default: statusWait,
    };


    if (statusIcons.hasOwnProperty(id)) {
      return statusIcons[id];
    } else {
      return statusIcons.default;
    }
  };





  return (
    <div className={style['cabinet-orders-details__ordercard']}>
      <div className={style['cabinet-orders-details__wrapper']}>
        <div className={style['cabinet-orders-details__leftside']}>
          <div className={style['cabinet-orders-details__paystatus']}>
          <div className={style['cabinet-orders-details__paystatus-icon']}>

            <Icon
              src={getIconFromStatus(status.id)}
              className={style['cabinet-orders-details__icon']}
              width = {20}
              height = { 20 }
              />
          </div>
          <div className={style['cabinet-orders-details__paystatus-text']}>            
            {status.title}
          </div>
          <div className={style['cabinet-orders-details__paystatus-button']}>
            <div className='inner-areon'>
              <button
                variant="info"
                className={style['cabinet-orders-details__tooltipicon']}
                onClick={ () => heandlerClickInfo(status.id) }
              >
                <Icon src={toolTipIcon} 
                  width = {20}
                  height = { 20 }
                />
              </button>
            </div>
          </div>

            {
              status.id === 'payment_waiting' ?
                <Button onClick={ () => openModalPay(numberOrder, total_cost) } variant={'cabinet_default'}>
                  оплатить заказ
                </Button>
                : null
            }
          </div>
          <div className={style['cabinet-orders-details__middle']}>
            <div className={style['cabinet-orders-details__pay']}>
              <Icon 
                src={wallet} 
                className={style['cabinet-orders-details__icon']} 
                width = {20}
                height = { 20 }
              />
              {payment_method}
            </div>
            <div className={style['cabinet-orders-details__delivery']}>
              <Icon 
                src={truck} 
                className={style['cabinet-orders-details__icon']} 
                width = {20}
                height = { 20 }
              />
              {delivery_method}
            </div>
          </div>
          <div className={style['cabinet-orders-details__address']}>
            <Icon 
              src={addressIcon} 
              alt="address" 
              className={style['cabinet-address__icon']} 
              width = {20}
              height = { 20 }
            />
            <div className={style['cabinet-address__desc']}>
              <div className={style['cabinet-address__value']}>
                {country}, {post_code} {city}, {street},{house}, {flat}
              </div>
              <div className={style['cabinet-address__name']}>
                {last_name} {first_name} {middle_name}
              </div>
              <div className={style['cabinet-address__phone']}>{phone}</div>
            </div>
          </div>
        </div>
        <CartViews.WrapperRightSide>
          <CartViews.BlockRightSide>
            <CartViews.Text variant={'order-text--default'}>Вес посылки:</CartViews.Text>
            <CartViews.Text variant={'order-text--default-currency'}>{weight} кг</CartViews.Text>
          </CartViews.BlockRightSide>
          <CartViews.BlockRightSide>
            <CartViews.Text variant={'order-text--default'}>
              <Text text={'order.cost'} />&nbsp;
            </CartViews.Text>
            <CartViews.Text variant={'order-text--default-currency'}>
              {order_cost.toFixed(2)}&nbsp;{currency}
            </CartViews.Text>
          </CartViews.BlockRightSide>

          {(role === ROLE.RETAIL)
            ? (<>
              <CartViews.BlockRightSide>
                {
                  !!discount ?
                    (<>
                      <CartViews.Text variant={'order-text--default'}>
                        <Text text={'sale'} />
                      </CartViews.Text>
                      <CartViews.Text variant={'order-text--red'}>
                        {discount.toFixed(2)} {currency}
                      </CartViews.Text>
                    </>
                    )
                    : null
                }
              </CartViews.BlockRightSide>
              <CartViews.BlockRightSide>
                <CartViews.Text variant={'order-text--default'}>
                  <Text text={'shipping'} />
                </CartViews.Text>
                <CartViews.Text variant={'order-text--default-currency'}>
                  {
                    !!delivery_cost ? (
                      <>
                        &nbsp;
                        {delivery_cost.toFixed(2)}&nbsp;
                        {currency}{' '}
                      </>
                    ) : null
                  }

                </CartViews.Text>
              </CartViews.BlockRightSide>
            </>)
            : (role === ROLE.DROPSHIPPER) ?
              (<>
                <CartViews.BlockRightSide>
                  <CartViews.Text variant={'order-text--default'}>
                    <Text text={'shipping'} />
                  </CartViews.Text>
                  <CartViews.Text variant={'order-text--default-currency'}>
                    {
                      !!delivery_cost ? (
                        <>
                          &nbsp;
                          {delivery_cost.toFixed(2)}&nbsp;
                          {currency}{' '}
                        </>
                      ) : (
                        <>
                          {'0.00'}&nbsp;{currency}
                        </>
                      )
                    }

                  </CartViews.Text>
                </CartViews.BlockRightSide>
              </>)
              : null
          }
          <CartViews.Line />
          <CartViews.BlockRightSide mb={20}>
            <CartViews.Text variant={'order-text--title'}>
              Итого:
            </CartViews.Text>
            <CartViews.Text variant={'order-text--title'}>
              {' '}
              {total_cost.toFixed(2)}&nbsp;{currency}
            </CartViews.Text>
          </CartViews.BlockRightSide>
        </CartViews.WrapperRightSide>
      </div>
      {!!comment ? (
        <div className={style['cabinet-orders-details__comment']}>
          <div className={style['cabinet-orders-details__comment-left']}>Комментарий:</div>
          <div className={style['cabinet-orders-details__comment-right']}>
            <div dangerouslySetInnerHTML={{ __html: comment }}></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(OrderBaseDetails);
