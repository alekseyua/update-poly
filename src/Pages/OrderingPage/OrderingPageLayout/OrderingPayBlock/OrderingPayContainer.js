import React, { useEffect, useState } from 'react';
import OrderingViews from '../../Views/OrderingViews';
import OrderingPay from './OrderingPay';

const OrderingPayContainer = ({ 
  payment_methods = [], 
  dataBalance, 
  total_cost,
  role, 

  setFieldValue = ()=>{}, 
}) => {

  const [paymentsVariant, setpaymentsVariant] = useState([]);
  const [stateMarquee, setStateMarquee] = useState(true)

  // useEffect(()=>{
  //   payment_methods = payment_methods.map(el=>({
  //     ...el,
  //     active: true
  //   }))
  //   if(dataBalance >= total_cost){
  //     setFieldValue('payment_methods', 3)
  //   }else{
  //     setFieldValue('payment_methods', 1)
  //   }
  //   setpaymentsVariant(payment_methods)
  // },[payment_methods])

  // const setActiveVariantPayments = (event) => {
  //   setStateMarquee(!stateMarquee)
  //   const id = Number(event.target.id);
  //   const newPaymentsVariant = paymentsVariant.map((el) => {
  //     if (el.id === id) {
  //       setFieldValue('payment_methods', el.id);
  //       return {
  //         ...el,
  //         active: true,
  //       };
  //     } else {
  //       if (el.id === payment_methods) setFieldValue('payment_methods', null);
  //       return {
  //         ...el,
  //         active: false,
  //       };
  //     }
  //   });
  //   setpaymentsVariant(newPaymentsVariant);
  // };
  return (
    <OrderingPay

    role = { role }
    />
  );
};

export default React.memo(OrderingPayContainer);
