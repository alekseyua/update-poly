import React, { useState } from 'react';
import OrderingDelivery from './OrderingDelivery';

const OrderingDeliveryContainer = ({
  delivery_condition, 
  delivery_methods = [],
  currency, 
  values,
  role,

  setValues,
}) => {

  const [idEnableBtn, setIdEnableBtn] = useState(null)

  const setActiveVariantPayments = (event) => {
    const id = Number(event.target.id);
    setIdEnableBtn(id)
    setValues({
      ...values,
      'variant': id
    })
  };


  return (
    <OrderingDelivery
        delivery_condition = { delivery_condition }
        deliveryVariant = { delivery_methods }
        idEnableBtn = { idEnableBtn }
        values = { values }
        role = { role }

        setActiveVariantPayments = { setActiveVariantPayments }
    />
  );
};

export default React.memo(OrderingDeliveryContainer);
