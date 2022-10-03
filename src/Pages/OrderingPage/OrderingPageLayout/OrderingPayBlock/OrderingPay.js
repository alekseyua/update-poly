import React from 'react';
import OrderingViews from '../../../../Views/OrderingViews';

const OrderingPay = ({ paymentsVariant, setActiveVariantPayments, role, dataBalance, total_cost }) => {

  return (
    <OrderingViews.OrderingPaySection>
      <OrderingViews.OrderingPayHead />
      <OrderingViews.OrderingPayDescription 
        dataBalance={dataBalance}
        total_cost={total_cost}
      />
      <OrderingViews.OrderingPayButtons
        payment_methods={paymentsVariant}
        setActiveVariantPayments={setActiveVariantPayments}
        role={role}
        dataBalance={dataBalance}
        total_cost={total_cost}
      />
    </OrderingViews.OrderingPaySection>
  );
};

export default React.memo(OrderingPay);
