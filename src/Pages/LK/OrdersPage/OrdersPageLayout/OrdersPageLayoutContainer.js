import React from 'react';
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
            statuses,
            profile,
            balance,
            orders,
            shop,
            role,
}) => {

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
            statuses = { statuses }
            balance = { balance }
            orders = { orders }
            shop = { shop }
            role = { role }
        />
    )
}

export default OrdersPageLayoutContainer;