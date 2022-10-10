import React, { useState } from 'react';
import OrderingPageLayout from './OrderingPageLayout';
import style from '../../CartPage/CartPageLayout/DatasPage/styles/cartpage.module.scss'
import { Link } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

const OrderingPageLayoutContainer = ({
    shriveledCartContent,
    delivery_condition,
    delivery_methods,
    payment_methods,
    addressDilivery,
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
            currency: currency
        }
        dispatch('payment', paramsPayment)
    }

    return (
        <OrderingPageLayout
            shriveledCartContent = { shriveledCartContent }
            delivery_condition = { delivery_condition }
            delivery_methods = { delivery_methods }
            payment_methods = { payment_methods }
            addressDilivery = { addressDilivery }
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