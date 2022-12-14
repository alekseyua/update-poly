import classNames from 'classnames';
import { Formik } from 'formik';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Text from '../../../helpers/Text';
import Form from '../../Form';
import {
  change,
  bayicon,
  shoppingBag,
  errorCanceled,
} from '../../../images';

import Icon from '../../Icon';
import ChatFieldAdmin from '../ChatField/ChatFieldAdmin';
import ChatFieldUser from '../ChatField/ChatFieldUser';
import SendChatBlock from '../SendChatBlock/SendChatBlock';

import style from './styles/index.module.scss';


const Card = ({
  title,
  size,
  color,
  change_agreement,
  order,
  prices,
  image,
  brand,
  status,
  id,
  url,
  role,
  can_cancel,
  currency,

  clickOpenCommit,
  openModalImage,
  deleteElementOrder,
  sendMessage,

}) => {

  const correspondenceState = []
  const getIconFromStatus = (id) => {
    const statusIcons = {
      collection: shoppingBag,
      redeemed: bayicon,
      replacement: change,
      canceled: errorCanceled,
      default: '#',
    };

    if (statusIcons.hasOwnProperty(id)) {
      return statusIcons[id];
    } else {
      return statusIcons.default;
    }
  };

  const initValuesMessageProduct = {
    files: null,
    message: '',
    upDownBtn: false,
    idProduct: id,
    activeBtnMessageForProduct: true
  }
  return (
    <div className={classNames({
      [style['cabinet-orders-details__card']]: true,
      [style['cabinet-orders-details__card--remove']]: status.id === 'canceled'
    })
    }>
      <div className={style['cabinet-orders-details__wrapper-block']}>
        <div onClick={() => openModalImage(image, url)}>
          <img src={image} className={style['cabinet-orders-details__image-thumb']} />
        </div>
        <div className={style['cabinet-orders-details__base-info']}>
          <NavLink to={`/${url}`}>
            <div className={style['cabinet-orders-details__base-info-brand']}>{brand}</div>
            <div className={style['cabinet-orders-details__base-info-title']}>{title}</div>
          </NavLink>
          <div className={style['cabinet-orders-details__base-info-wrapper']}>
            <div className={style['cabinet-orders-details__base-info-col']}>
              <div className={style['cabinet-orders-details__base-info-desc']}>
                <Text text={'size'} />
                :&nbsp;
                <span className={style['cabinet-orders-details__base-info-desc--black']}>
                  {size}
                </span>
              </div>
              <div className={style['cabinet-orders-details__base-info-desc']}>
                <Text text={'color'} />
                :&nbsp;
                <span className={style['cabinet-orders-details__base-info-desc--black']}>
                  {color}
                </span>
              </div>
              <div className={style['cabinet-orders-details__base-info-desc']}>
                ????????????:&nbsp;
                <span className={style['cabinet-orders-details__base-info-desc--black']}>
                  {change_agreement ? '??????????????????' : '???? ??????????????????'}
                </span>
              </div>
            </div>
            <div className={style['cabinet-orders-details__base-info-col']}>
              <div className={style['cabinet-orders-details__base-info-desc']}>
                ??????-????:&nbsp;
                <span className={style['cabinet-orders-details__base-info-desc--black']}>
                  1 ????.
                </span>
              </div>
              <div className={style['cabinet-orders-details__base-info-desc']}>
                <div>
                  <b>????????:&nbsp;</b>
                </div>
                <span className={style['cabinet-orders-details__base-info-desc--red']}>
                  {prices.price} {currency}&nbsp;
                </span>
              </div>
              <div className={style['cabinet-orders-details__base-info-desc']}>
                {
              status.id !== 'canceled' ?
                <div className={style['cabinet-orders-details__base-info-desc--status-main']}>
                  {status.id !== 'payment_waiting' &&
                    status.id !== 'paid' &&
                    status.id !== 'packaging' &&
                    status.id !== 'sended' &&
                    status.id !== 'ordered' ? (
                    <Icon
                      slot="icon-left"
                      src={getIconFromStatus(status.id)}
                      className={style['cabinet-orders-details__base-info-icon']}
                      width={20}
                      height={20}
                    />
                  ) : status.id === 'payment_waiting' ? (
                    <span className={style['cabinet-orders-details__icon--payment']}>????</span>
                  ) : status.id === 'paid' ? (
                    <span className={style['cabinet-orders-details__icon--paid']}>??????</span>
                  ) : status.id === 'ordered' ? (
                    <span className={style['cabinet-orders-details__icon--paid']}>???</span>
                  ) : status.id === 'packaging' ? (
                    <span className={style['cabinet-orders-details__icon--packaging']}>????</span>
                  ) : status.id === 'sended' ? (
                    <span className={style['cabinet-orders-details__icon--sended']}>????</span>
                  ) : null}
                  <span className={style['cabinet-orders-details__base-info-desc--status']}>
                    {status.title}
                  </span>
                </div>
              : null

                }
                
              </div>
            </div>
          </div>
          {/* {role !== ROLE.WHOLESALE? */}
          <div className={style['cabinet-orders-details__btn-order-item--block-canceled']}>
            {
                (status.id === 'payment_waiting' ||
                  status.id === 'collection' ||
                  status.id === 'paid') && can_cancel ? (
                  <button
                    variant="default"
                    className={style['cabinet-orders-details__btn-order-item--canceled']}
                    key={id}
                    onClick={() => deleteElementOrder(id)}
                  >
                    ????????????????
                  </button>
                ) : null
            }
          </div>
          {/* :null
          } */}
        </div>
      </div>


      <Formik
        initialValues={initValuesMessageProduct}
        onSubmit={sendMessage}
      >
        {({ values, errors, handleSubmit, handleChange, setFieldValue }) => {
          
          return (
            <Form 
              id = { id }
              onSubmit={handleSubmit}
            >
              <div className={classNames({
                  [style['cabinet-orders-details__comment']]: true,
                  [style['active']]: values.upDownBtn
                })}
              >
                <div
                  className={classNames({
                    [style['cabinet-orders-details__comment-field']]: true,
                    [style['active']]: values.upDownBtn
                  })}
                >
                  <div
                    className={style['cabinet-orders-details__comment-field-message']}
                  >
                    {correspondenceState.map((el, i) => {
                      if (el.is_new && el.user === "????????????????") {
                        result.push(el.message_id)
                      }
                      if (el.is_me) {
                        return (
                          <ChatFieldUser
                            openModalImage={openModalImage}
                            // openModalVideo={openModalVideo}
                            key={i}
                            {...el}
                          />
                        );
                      } else {
                        return (
                          <div
                            className={style['cabinet-orders-details__comment-admin-wrapper']}
                          >
                            {values.upDownBtn ?
                              el.is_new ?
                                <div
                                  onClick={() => clickOpenCommit(result, el.order_item_id)}
                                  className={style['cabinet-orders-details__comment-bell']}
                                ></div>
                                : null
                              : null}
                            <ChatFieldAdmin
                              openModalImage={openModalImage}
                              // openModalVideo={openModalVideo}
                              key={i}
                              {...el}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>

                  <div className={style['cabinet-orders-details__comment-field-files']}>
                  </div>
                </div>
                {
                  !!correspondenceState.length ?
                    <div
                      onClick={() => clickOpenCommit(idMessagers, idOrderMessagers)}
                      className={style['cabinet-orders-details__comment-up-down']}
                    ></div>
                    : null
                }

                <SendChatBlock
                  values = { values }
                  nameInput = { 'message' }
                  nameFile = { 'files' }
                  setFieldValue = { setFieldValue }
                />

              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
};

export default React.memo(Card);
