import React from 'react';
import OrderingViews from '../../../../Views/OrderingViews';

const OrderingPay = ({ 
  payment_methods, 
  total_cost,
  balance, 
  role,

  setActiveVariantPayments,
  setValues,
}) => {

  return (
    <OrderingViews.OrderingPaySection>
      <OrderingViews.OrderingPayHead />
      <OrderingViews.OrderingPayDescription 
        total_cost = { total_cost }
        balance = { balance }
      />
      <OrderingViews.OrderingPayButtons
        setActiveVariantPayments = { setActiveVariantPayments }
        payment_methods = { payment_methods }
        total_cost = { total_cost }
        setValues = { setValues }
        balance = { balance }
        role = { role }
      />
    </OrderingViews.OrderingPaySection>
  );
};

export default React.memo(OrderingPay);
