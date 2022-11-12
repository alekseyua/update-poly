import React, { useEffect, useState } from 'react';
import OrderingViews from '../../Views/OrderingViews';
import OrderingPay from './OrderingPay';

const OrderingPayContainer = ({ 
  payment_methods = [], 
  total_cost,
  balance, 
  values,
  role, 

  setValues, 
}) => {
 
  const setActiveVariantPayments = () => {
    if (balance >= total_cost){
        setValues({ 
          ...values,
          'payment_methods': 3 
        })
    }
    setValues({ 
      ...values,
      'payment_methods': 1 
    })
  };
  
  useEffect(()=>{
    const timerSetTimeout = setTimeout(()=>{
      setActiveVariantPayments()
      clearTimeout(timerSetTimeout)
    },1000)
  },[])

  return (
    <OrderingPay
    payment_methods = { payment_methods }
    total_cost = { total_cost }
    balance = { balance }
    values = { values }
    role = { role }

    // setActiveVariantPayments = { setActiveVariantPayments }
    setValues = { setValues }
    />
  );
};

export default React.memo(OrderingPayContainer);
