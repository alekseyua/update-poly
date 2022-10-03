import React from 'react';
import OrderingViews from '../../../../Views/OrderingViews';

const OrderingDelivery = ({

  idEnableBtn,
  setActiveVariantPayments,
  delivery_condition,
  deliveryVariant,
  role,
}) => {
 
  return (
    <OrderingViews.OrderingDeliverySection>
      <OrderingViews.OrderingDeliveryHead />
      <OrderingViews.OrderingDeliveryDescription 
        role={role}
      />
      <OrderingViews.OrderingDeliveryVariantsBtn
        deliveryVariant={deliveryVariant}
        delivery_condition={delivery_condition}
        setActiveVariantPayments={setActiveVariantPayments}
        idEnableBtn={idEnableBtn}
      />

    </OrderingViews.OrderingDeliverySection>
  );
};

export default React.memo(OrderingDelivery);
