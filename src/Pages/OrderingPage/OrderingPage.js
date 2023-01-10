import React from 'react';
import OrderingPageLayoutContainer from './OrderingPageLayout/OrderingPageLayoutContainer';

const OrderingPage = ({
    context
}) => {
 
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
        cart_items: dataCart.cartitem_set.filter( el => el.is_selected? el.is_selected : el.selected ),
        in_stock: dataCart.in_stock.filter( el => el.is_selected? el.is_selected : el.selected ),
        selected: dataCart.selected,
    }
    console.log({dataCart})
    console.log({shriveledCartContent})

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