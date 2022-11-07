import React from 'react';
import OrdersPageLayoutContainer from './OrdersPageLayout/OrdersPageLayoutContainer';

const OrdersPage = ({
    context
}) => {
    // console.log({ OrdersPage: context })

    const {        
        cabinet_site_menu,
        cabinet_menu,
        breadcrumbs,
        statuses,
        currency,
        profile,
        order,
        shop,
    } = context;
    
    const { orders, tableBodyData, dateFilterData, searchOrderForFio } = order;
    const { user = {}, role, passport, organization, links, balance, id } = profile;
    // const { is_has_shop, shop_link } = shop;
    const { username } = user;
    
    return (
        <>
        <OrdersPageLayoutContainer
            cabinet_site_menu = { cabinet_site_menu }
            searchOrderForFio = { searchOrderForFio }
            dateFilterData = { dateFilterData }
            tableBodyData = { tableBodyData }
            cabinet_menu = { cabinet_menu }
            breadcrumbs = { breadcrumbs }
            create_shop = { shop?.shop_link }
            is_has_shop = { shop?.is_has_shop }
            profileId = { id }
            username = { username }
            currency = { currency }
            statuses = { statuses }
            profile = { profile }
            balance = { balance }
            orders = { orders }
            shop = { shop }
            role = { role }
        />
        </>
    )
}

export default OrdersPage;