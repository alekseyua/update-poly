import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import { ROLE } from '../../../const';
import CartPageLayout from './CartPageLayout';

const CartPageLayoutContainer = ({
    numberCurrentOrderForAddProduct,
    valueButtonNextToOrder,
    textConditionPayPart_1,
    textConditionPayPart_2,
    agreeWitheRegulations,
    recomendetProducts,
    opt_minimum_price,
    listCurrentOrder,
    enableAllSelect,
    total_discount,
    profileInCart,
    is_performed,
    cartitem_set,
    breadcrumbs,
    total_price,
    selected,
    currency,
    in_stock,
    in_cart,
    role,
}) => {
    const { dispatch } = useStoreon();

    const deleteProductFromCart=(id)=>{
        const params = {
            id: id
        }
        dispatch('deleteItemFromCart', params)
    }

    const contextUpdateProductFromCard = (id, qty, selected) => {
        const params = [{
            id: id,
            qty: qty,
            selected: selected
        }]
        dispatch('updateInProductCard', params)
    }

    const decCounterProduct = (id, qty, selected) => {        
        if ( qty === 1 ) return;
        const params = [{
            id: id,
            qty: qty - 1,
            selected: selected
        }]
        dispatch('updateInProductCard', params)
    }

    const incCounterProduct = (id, qty, selected) => {
        const params = [{
            id: id,
            qty: qty + 1,
            selected: selected
        }]
        dispatch('updateInProductCard', params)
    }
    
    const multipleDeleteFromCart = () => dispatch('multipleDeleteFromCart');
    const selectAllItemsInCart = () => dispatch('selectAllItemsInCart');
   
    const openModalListAddCurrencyOrdering = () => {
        dispatch('modalOpenListForAddProduct')
    }

    const handleAgreeWitheRegulations = value => {
        dispatch('handleAgreeWitheRegulations');
    }

    return (
        <CartPageLayout
        numberCurrentOrderForAddProduct = { numberCurrentOrderForAddProduct }
        textConditionPayPart_1 = { textConditionPayPart_1 }
        textConditionPayPart_2 = { textConditionPayPart_2 }
        valueButtonNextToOrder = { valueButtonNextToOrder }
        agreeWitheRegulations = { agreeWitheRegulations }
        recomendetProducts = { recomendetProducts }
        opt_minimum_price = { opt_minimum_price }
        listCurrentOrder = { listCurrentOrder }
        enableAllSelect = { enableAllSelect }
        total_discount={ total_discount }
        profileInCart = { profileInCart }
        is_performed= { is_performed }
        cartitem_set= { cartitem_set }
        total_price = { total_price }
        breadcrumbs={ breadcrumbs }
        in_stock = { in_stock }
        selected = { selected }
        currency = { currency }
        in_cart = { in_cart }
        role = { role }

        openModalListAddCurrencyOrdering = { openModalListAddCurrencyOrdering }
        contextUpdateProductFromCard = { contextUpdateProductFromCard }
        handleAgreeWitheRegulations = { handleAgreeWitheRegulations }
        multipleDeleteFromCart ={ multipleDeleteFromCart }
        deleteProductFromCart = { deleteProductFromCart }
        selectAllItemsInCart = { selectAllItemsInCart }
        decCounterProduct = { decCounterProduct }
        incCounterProduct = { incCounterProduct }
        />
    )
}

export default CartPageLayoutContainer;