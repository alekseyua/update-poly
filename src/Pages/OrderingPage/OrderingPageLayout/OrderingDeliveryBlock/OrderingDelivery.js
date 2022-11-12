import React from 'react';
import OrderingViews from '../../../../Views/OrderingViews';

const OrderingDelivery = ({
  delivery_condition,
  deliveryVariant,
  idEnableBtn,
  values,
  role,
  
  setActiveVariantPayments,
}) => {
 
  return (
    <OrderingViews.OrderingDeliverySection>
      <OrderingViews.OrderingDeliveryHead />
      <OrderingViews.OrderingDeliveryDescription 
        role = { role }
      />
      <OrderingViews.OrderingDeliveryVariantsBtn
        delivery_condition = { delivery_condition }
        deliveryVariant = { deliveryVariant }
        idEnableBtn = { idEnableBtn }
        values = { values }

        setActiveVariantPayments = { setActiveVariantPayments }
        />

    </OrderingViews.OrderingDeliverySection>
  );
};

export default React.memo(OrderingDelivery);
