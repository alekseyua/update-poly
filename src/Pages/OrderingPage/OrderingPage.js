import React from 'react';
import OrderingPageLayoutContainer from './OrderingPageLayout/OrderingPageLayoutContainer';

const OrderingPage = ({
    ...props
}) => {
    console.log({ OrderingPage: props.context })
    const { context } = props;
    const {
        numberCurrentOrderForAddProduct,
        role_configuration,
        delivery_methods,
        payment_methods,
        cart_content,
        breadcrumbs,
        page_info,
        dataCart,
        currency,
        profile,
        order,  
    } = context;

    const {        
        balance,
        role,
    } = profile;

    const profileId = profile.id;

    const {
        total_price,        
    } = dataCart;

    const { addressDilivery, priceDilivery } = order;

    const {
        delivery_condition,        
    } = role_configuration;

    const shriveledCartContent = {
        cart_items: dataCart.cartitem_set.filter( el => el.selected),
        in_stock: dataCart.in_stock.filter( el => el.selected),
        selected: dataCart.selected,
    }

    return (
        <OrderingPageLayoutContainer
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
            balance = { balance }
            role = { role }
        />
    )
}

export default OrderingPage;