import React, { useState } from 'react';
import OrderingPageLayout from './OrderingPageLayout';
import style from '../../CartPage/CartPageLayout/DatasPage/styles/cartpage.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';


const OrderingPageLayoutContainer = ({
    numberCurrentOrderForAddProduct,
    shriveledCartContent,
    delivery_condition,
    delivery_methods,
    payment_methods,
    addressDilivery,
    priceDilivery,
    cart_content,
    breadcrumbs,
    total_price,
    profileId,
    currency,
    balance, 
    role,
}) => {
    const { dispatch } = useStoreon();
    const [styleCar, setStyleCar] = useState('orderCar disable');
    const navigate = useNavigate();

    const labelLink = () => {
        return (
            <div
                className={style['cart-page__condition-redeem']}
            >
                Согласен с {' '}
                <Link
                    to={'/juridical'}
                >
                    условиями оформления заказа {' '}
                </Link>

                на торговой бизнес-платформе и с{' '}
                <Link
                    // target="_blank"
                    to={'/exchange'}>
                    правилами возврата
                </Link>
            </div>)
    }

    const handlerSubmitOrder = (values, currency) =>{
        const paramsPayment = {
            ...values,
            currency: currency?.toLocaleUpperCase(),
            redirectTo: (to) => {
                const timerTimeout = setTimeout(()=>{
                    navigate(to);
                    return () => clearTimeout(timerTimeout);          
                },500)
            }
        }
        dispatch('payment', paramsPayment)
    }

    return (
        <OrderingPageLayout
            numberCurrentOrderForAddProduct = { numberCurrentOrderForAddProduct }
            shriveledCartContent = { shriveledCartContent }
            delivery_condition = { delivery_condition }
            delivery_methods = { delivery_methods }
            payment_methods = { payment_methods }
            addressDilivery = { addressDilivery }
            priceDilivery = { priceDilivery }
            cart_content = { cart_content }
            breadcrumbs = { breadcrumbs }
            total_price = { total_price }
            profileId = { profileId }
            currency = { currency }
            styleCar = { styleCar }
            balance = { balance }
            role = { role }

            labelLink = { labelLink }
            setStyleCar = { setStyleCar }
            handlerSubmitOrder = { handlerSubmitOrder }
        />
    )
}

export default OrderingPageLayoutContainer;