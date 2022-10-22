import React, { useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import OrderDetailsPersonalPageLayout from './OrderDetailsPersonalPageLayout';

const OrderDetailsPersonalPageLayoutContainer = ({
    cabinet_site_menu,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    currency,
    username,
    balance,
    shop,
    role,

    idOrder,
    status,
    weight,
    services,
    discount,
    in_archive,
    total_cost,
    updated_at,
    order_cost,
    created_at,
    delivery_cost,
    delivery_method,
    delivery_address,
    fullNumberOrder,
    payment_method,
    specification,
    track_number,
}) => {

    const { dispatch } = useStoreon();
        
    const openModalPay = (fullNumberOrder, total_cost) => {
        const params = {
          order_id: fullNumberOrder,
          total_price: total_cost
        }
        dispatch('modalCheckPayment',params)
      };

      const heandlerClickInfo = (status) => {

        dispatch('modalShowInfoOrder', {...status})        
      }

    return (
        <OrderDetailsPersonalPageLayout
        cabinet_site_menu = { cabinet_site_menu }
        cabinet_menu = { cabinet_menu }
        breadcrumbs = { breadcrumbs }
        create_shop = { create_shop }
        is_has_shop = { is_has_shop }
        currency = { currency }
        username = { username }
        balance = { balance }
        shop = { shop }
        role = { role }

        idOrder = { idOrder }
        status = { status }
        weight = { weight }
        services = { services }
        discount = { discount }
        in_archive = { in_archive }
        total_cost = { total_cost }
        updated_at = { updated_at }
        order_cost = { order_cost }
        created_at = { created_at }
        delivery_cost = { delivery_cost }
        delivery_method = { delivery_method }
        fullNumberOrder = { fullNumberOrder }
        delivery_address = { delivery_address }
        payment_method = { payment_method }
        specification = { specification }
        track_number = { track_number }

        openModalPay = { openModalPay }
        heandlerClickInfo = { heandlerClickInfo }
        />
    )
}

export default OrderDetailsPersonalPageLayoutContainer;