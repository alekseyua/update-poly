import React from 'react';
import { useStoreon } from 'storeon/react';
import OrderDetailsPersonalPageLayout from './OrderDetailsPersonalPageLayout';

const OrderDetailsPersonalPageLayoutContainer = ({
  cabinet_site_menu,
  cabinet_menu,
  breadcrumbs,
  create_shop,
  is_has_shop,
  currency,
  username,
  balance,
  shop,
  role,

  idOrder,
  status,
  weight,
  services,
  discount,
  in_archive,
  total_cost,
  updated_at,
  order_cost,
  created_at,
  delivery_cost,
  delivery_method,
  delivery_address,
  fullNumberOrder,
  payment_method,
  specification,
  track_number,
  dataOrderItems,
  activeButtonSpecification,
  order_items_chat,
  order_chat,
}) => {

  const { dispatch } = useStoreon();
  const numberOrder = fullNumberOrder?.split('-').pop();
  const openModalPay = (NumberOrder, total_cost) => {
    const params = {
      order_id: NumberOrder,
      total_price: total_cost
    }
    dispatch('modalCheckPayment', params)
  };

  const heandlerClickInfo = (status) => {
    dispatch('modalShowInfoOrder', {...status})    
    // dispatch('correspondence')
  }

  const handlerSpecification = () => {
    dispatch('getSpecification')
  }

  const deleteElementOrder = (id) => {
    const params = {
      id_goods: id
    }
    dispatch('removeItemFromOrder', params)
  }


  const sendCommentFromTextField = (order_id) => {
    console.log('send message', order_id)

  };

  const clickOpenCommit = (values, setFieldValue) => {
    console.log('click open commit')
    const params = {
      idProduct: values.idProduct
    }
    dispatch('changeStateIsnewMessage', params)
    setFieldValue('upDownBtn', !values.upDownBtn )
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

  const openModalImage = (image, url) => {
    console.log('click open image')

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

  const sendMessage = (values, { setFieldValue }) => {
    console.log('send', { values })

    const params = {
      ...values,
      idProduct: values?.orderChat ? values.orderChat : values.idProduct,
      setFieldValue: setFieldValue
    }
    if (values?.orderChat) {
      dispatch('sendMessageChatProduct', params)
    } else {
      dispatch('sendMessageProduct', params)
    }
  }

  return (
    <OrderDetailsPersonalPageLayout
      cabinet_site_menu={cabinet_site_menu}
      cabinet_menu={cabinet_menu}
      breadcrumbs={breadcrumbs}
      create_shop={create_shop}
      is_has_shop={is_has_shop}
      currency={currency}
      username={username}
      balance={balance}
      shop={shop}
      role={role}

      idOrder={idOrder}
      status={status}
      weight={weight}
      services={services}
      discount={discount}
      in_archive={in_archive}
      total_cost={total_cost}
      updated_at={updated_at}
      order_cost={order_cost}
      created_at={created_at}
      numberOrder = { numberOrder }
      order_items_chat = { order_items_chat }
      order_chat = { order_chat }
      delivery_cost={delivery_cost}
      delivery_method={delivery_method}
      fullNumberOrder={fullNumberOrder}
      delivery_address={delivery_address}
      payment_method={payment_method}
      specification={specification}
      track_number={track_number}
      dataOrderItems={dataOrderItems}

      openModalPay={openModalPay}
      heandlerClickInfo={heandlerClickInfo}
      handlerSpecification={handlerSpecification}
      activeButtonSpecification={activeButtonSpecification}
      deleteElementOrder={deleteElementOrder}
      sendCommentFromTextField={sendCommentFromTextField}
      clickOpenCommit={clickOpenCommit}
      openModalImage={openModalImage}
      sendMessage={sendMessage}
    />
  )
}

export default OrderDetailsPersonalPageLayoutContainer;