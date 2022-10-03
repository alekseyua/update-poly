import React from 'react';
import OrderingPageLayoutContainer from './OrderingPageLayout/OrderingPageLayoutContainer';

const OrderingPage = ({
    ...props
}) => {
    console.log({OrderingPage: props.context})
    const { context } = props;
    const { 
        cart_content,
        breadcrumbs,
        dataCart,
        page_info,
        currency,
        profile,
     } = context;
       const { role } = profile;
       const shriveledCartContent = {
        cart_items: dataCart.cartitem_set,
        in_stock: dataCart.in_stock,
        selected: dataCart.selected,
       }

    return (
        <OrderingPageLayoutContainer
            shriveledCartContent = { shriveledCartContent }
            cart_content = { cart_content }
            breadcrumbs = { breadcrumbs }
            currency = { currency }
            role = { role }
        />
    )
}

export default OrderingPage;