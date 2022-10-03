import React from 'react';
import CartPageLayoutContainer from './CartPageLayout/CartPageLayoutContainer';

const CartPage = ({...props}) => {
    console.log('cart page = ',props.context)
    const { breadcrumbs, 
        listCurrentOrder,
        info_delivery, 
        dataProducts,
        page_info, 
        dataCart, 
        currency, 
        profile, 
    } = props.context;
    const opt_minimum_price = null;
    const textConditionPayPart_1 = page_info?.components[0]?.children[0]?.content;
    const textConditionPayPart_2 = page_info?.components[0]?.children[1]?.content;
    const {
        agreeWitheRegulations,     
        enableAllSelect,
        total_discount, 
        is_performed, 
        cartitem_set, 
        total_price,
        in_stock, 
        selected,
        in_cart, 
     } = dataCart
    const { role } = profile;
    
    

    console.log('---------------------------',{
        context: props.context
    })
    return (
        <CartPageLayoutContainer
            textConditionPayPart_1 = { textConditionPayPart_1 }
            textConditionPayPart_2 = { textConditionPayPart_2 }
            agreeWitheRegulations = { agreeWitheRegulations }
            recomendetProducts = { dataProducts?.results }
            opt_minimum_price = { opt_minimum_price }
            listCurrentOrder = { listCurrentOrder }
            enableAllSelect = { enableAllSelect }
            total_discount = { total_discount }
            is_performed = { is_performed }
            cartitem_set = { cartitem_set }
            breadcrumbs = { breadcrumbs }
            total_price = { total_price }
            selected = { selected }
            currency = { currency }
            in_stock = { in_stock }
            in_cart = { in_cart }
            role = { role }
        />
    )
}

export default CartPage;