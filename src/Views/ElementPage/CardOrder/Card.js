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
  paperclip,
  send,
} from '../../../images';
import AddUploadFiles from '../../AddFiles';
import Button from '../../Button';
import Icon from '../../Icon';
import ImageUpload from '../../ImageUpload';
import Input from '../../Input';
import ChatFieldAdmin from '../ChatField/ChatFieldAdmin';
import ChatFieldUser from '../ChatField/ChatFieldUser';

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
  deleteElementOrder,
  id,
  url,
  role,
  can_cancel,
  currency,
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

  // useEffect(()=>{
  //   const dataChatItem = chatOrdersMessage.filter(item=> item.item_id === id)
  //   if(dataChatItem[0] !== undefined){
  //     const messages = dataChatItem[0].chat_order_items
  //     const result = []
  //     const data = messages.filter(el =>{
  //       if(el.is_new && el.user === "Менеджер") {
  //         result.push(+el.message_id)
  //         setIdMessagers(result)
  //         setIdOrderMessagers(el.order_item_id)
  //       }
  //     })
  //     setcorrespondenceState(messages)
  //   }
  // },[chatOrdersMessage])

  const openModalImage = (image, url) => {
    // setModalStates({
    //   content: (
    //     <ModalContentViews.ModalWrapper>
    //       <ModalContentViews.CloseBtn closeModal={closeModal} />
    //       <ModalContentViews.ContentBlock>
    //         <ModalContentViews.CenterPosition>
    //           <ModalContentViews.ViewsImage image={image} url={url} />
    //         </ModalContentViews.CenterPosition>
    //       </ModalContentViews.ContentBlock>
    //     </ModalContentViews.ModalWrapper>
    //   ),
    //   show: true,
    //   addClass: 'modal-review',
    // });
  };

  const sendCommentFromTextField = (order_id) => {
    // setDisablebtn(true)
    // const fd = new FormData();
    // fd.set('order_item_id', order_id);
    // fd.set('message', valuesState.text_field);
    // fd.set('files', valuesState.file_list);     

    // orderApi
    //   .postCorrespondence_order_item(fd)
    //   .then((res) => {
    //     //getChatData();
    //     setAmountFile(null);
    //     setvaluesState({
    //       text_field: '',
    //       file_list: [],
    //     });
    //   })
    //   .catch(err=>{
    //     setDisablebtn(false)
    //   });
  };

  const clickOpenCommit = (result = [], order_item_id = 0) => {
    // if(!!result.length){

    //   orderApi
    //     .postCorrespondence_order_item_remake_is_new({
    //       order_item_id:order_item_id,
    //       ids:result
    //     })
    //     .then((res) => {
    //       console.log('res',res)   
    //     setcorrespondenceState(res)

    //     })
    //     .catch(err=>{
    //       console.log('Error',err)
    //     });
    // }
    // setUpDownBtn(c=>!c)
  }

  const sendMessage = (values, func) => {
    console.log('send', { values }, { func })
  }
  const initValuesMessageProduct = {
    image: null,
    textMessage: '',
    upDownBtn: false,

  }
  return (
    <div className={style['cabinet-orders-details__card']}>
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
                Замена:&nbsp;
                <span className={style['cabinet-orders-details__base-info-desc--black']}>
                  {change_agreement ? 'разрешена' : 'не разрешена'}
                </span>
              </div>
            </div>
            <div className={style['cabinet-orders-details__base-info-col']}>
              <div className={style['cabinet-orders-details__base-info-desc']}>
                Кол-во:&nbsp;
                <span className={style['cabinet-orders-details__base-info-desc--black']}>
                  1 шт.
                </span>
              </div>
              <div className={style['cabinet-orders-details__base-info-desc']}>
                <div>
                  <b>Цена:&nbsp;</b>
                </div>
                <span className={style['cabinet-orders-details__base-info-desc--red']}>
                  {prices.price} {currency}&nbsp;
                </span>
              </div>
              <div className={style['cabinet-orders-details__base-info-desc']}>
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
                    <span className={style['cabinet-orders-details__icon--payment']}>💳</span>
                  ) : status.id === 'paid' ? (
                    <span className={style['cabinet-orders-details__icon--paid']}>✔️</span>
                  ) : status.id === 'ordered' ? (
                    <span className={style['cabinet-orders-details__icon--paid']}>✅</span>
                  ) : status.id === 'packaging' ? (
                    <span className={style['cabinet-orders-details__icon--packaging']}>🛍</span>
                  ) : status.id === 'sended' ? (
                    <span className={style['cabinet-orders-details__icon--sended']}>🛫</span>
                  ) : null}
                  <span className={style['cabinet-orders-details__base-info-desc--status']}>
                    {status.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* {role !== ROLE.WHOLESALE? */}
          <div className={style['cabinet-orders-details__btn-order-item--block-canceled']}>
            {(status.id === 'payment_waiting' ||
              status.id === 'collection' ||
              status.id === 'paid') && can_cancel ? (
              <button
                variant="default"
                className={style['cabinet-orders-details__btn-order-item--canceled']}
                key={id}
                onClick={() => deleteElementOrder(id, order)}
              >
                отменить
              </button>
            ) : null}
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
          console.log({values})
          return (
            <Form onSubmit={handleSubmit}>

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
                            if (el.is_new && el.user === "Менеджер") {
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
                      <div className={style['cabinet-orders-details__comment-send']}>
                        <Input
                          placeholder={'Оставить комментарий к товару'}
                          className={'cabinet-orders-details__comment-input'}
                          value={values.textMessage}
                          onChange={(e) => {
                            console.log({ e })
                            // !!e.target.value?
                            // setDisablebtn(false)
                            // : setDisablebtn(true)
                          }
                          }
                        ></Input>

                        <div className={style['cabinet-orders-details__comment-buttons']} >
                          {/* <Button
                    variant="text"
                    id={id}
                    onClick={(e) => {
                      if (e.target.childNodes.length) {
                        e.target.childNodes[0].click();
                      }
                    }}
                  >
                    <input
                      // multiple
                      ref={fileInputRef}
                      className={'hidden'}
                      id = {`image-${id}`}
                      type={"file"}
                      accept={".png, .jpg, .jpeg, .mp4"}
                      name={'image'}
                      onChange={(event) => {
                        const files = event.currentTarget.files;
                        console.log({files})
                        // setAmountFile(event.currentTarget.files.length);  
                        // setvaluesState({ text_field: valuesState.text_field, file_list: files[0] });
                        // !!files[0]?
                        //   setDisablebtn(false)
                        //   :null
                      }}
                    />
                    <Icon src={paperclip} width={20} height={20} />
                    {amountFile ? (
                      // <gx-badge type="warning" pill>
                        {amountFile}
                      // </gx-badge>
                    ) : null}
                  </Button> */}
                          <AddUploadFiles
                            name={'image'}
                            type={'file'}
                            className={'cabinet-orders-details'}
                            label={''}
                            accept={'.png, .jpg, .jpeg, .mp4'}
                            multiple={true}
                            setFieldValue={setFieldValue}
                            textButton = { <Icon src = {paperclip} width={20} height={20}/> }
                          />
                          <Button
                            onClick={() => sendCommentFromTextField(id)}
                            variant="text"
                          // disabled={disableBtn}
                          >
                            <Icon src={send} width={20} height={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
};

export default React.memo(Card);
