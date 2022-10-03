import React from 'react';
import OrderingPageLayout from './OrderingPageLayout';
import style from '../../CartPage/CartPageLayout/DatasPage/styles/cartpage.module.scss'
import { Link } from 'react-router-dom';

const OrderingPageLayoutContainer = ({
    shriveledCartContent,
    cart_content,
    breadcrumbs,
    currency,
    role,
}) => {

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

    return (
        <OrderingPageLayout
            shriveledCartContent = { shriveledCartContent }
            cart_content = { cart_content }
            breadcrumbs = { breadcrumbs }
            currency = { currency }
            role = { role }

            labelLink = { labelLink }
        />
    )
}

export default OrderingPageLayoutContainer;