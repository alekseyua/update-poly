import React from 'react';
import { useStoreon } from 'storeon/react';
import OrdersPageLayout from './OrdersPageLayout';

const OrdersPageLayoutContainer = ({
            cabinet_site_menu,
            dateFilterData,
            tableBodyData,
            cabinet_menu,
            breadcrumbs,
            create_shop,
            is_has_shop,
            profileId,
            username,
            currency,
            statuses,
            profile,
            balance,
            orders,
            shop,
            role,
}) => {
    const { dispatch } = useStoreon();

    const getDataOrdersFilters = data => {
        dispatch('getOrders', data)
    }

    const btnAddOrderItems = (el) => {  
        const params = {
          id: el.id
        }
        dispatch('addNumOrder', params)
    }

    const btnDelOrder = (data) => {
        const params = {
            id: data.id
        }
        dispatch('cancelOrder', params)
    }

    const sendToArchive = (data) => {
        const params = {
          id: data.id
        }
        dispatch('sendToArchive', params)
      }

    return (
        <OrdersPageLayout
            cabinet_site_menu = { cabinet_site_menu }
            dateFilterData = { dateFilterData }
            tableBodyData = { tableBodyData }
            cabinet_menu = { cabinet_menu }
            breadcrumbs = { breadcrumbs }
            create_shop = { create_shop }
            is_has_shop = { is_has_shop }
            profileId = { profileId }
            profile = { profile }
            username = { username }
            currency = { currency }
            statuses = { statuses }
            balance = { balance }
            orders = { orders }
            shop = { shop }
            role = { role }
            
            getDataOrdersFilters = { getDataOrdersFilters }
            btnAddOrderItems = { btnAddOrderItems }
            sendToArchive = { sendToArchive }
            btnDelOrder = { btnDelOrder }
        />
    )
}

export default OrdersPageLayoutContainer;