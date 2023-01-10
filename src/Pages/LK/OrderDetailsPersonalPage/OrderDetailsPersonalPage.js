import React from 'react';
import OrderDetailsPersonalPageLayoutContainer from './OrderDetailsPersonalPageLayout/OrderDetailsPersonalPageLayoutContainer';

const OrderDetailsPersonalPage = ({
    context,

}) => {

    const {
        cabinet_site_menu,
        cabinet_menu,
        breadcrumbs,
        currency,
        profile,
        order,
        shop,
    } = context;

    const {
        id,
        status,
        weight,
        services,
        discount,
        in_archive,
        total_cost,
        updated_at,
        order_cost,
        created_at,
        track_number,
        delivery_cost,
        specification,
        correspondence,
        dataOrderItems,
        payment_method,
        delivery_method,
        fullNumberOrder,
        delivery_address,
        deleteElementOrder,
    } = order;
console.log({correspondence})
    const idOrder = id;
    const order_chat = correspondence?.order_chat;
    const order_items_chat = correspondence?.order_items_chat;

    const { user = {}, role, balance } = profile;
    const { username } = user;
    const amountNotifications = profile?.notifications;

    return (
        <OrderDetailsPersonalPageLayoutContainer
            amountNotifications={amountNotifications}
            cabinet_site_menu={cabinet_site_menu}
            cabinet_menu={cabinet_menu}
            breadcrumbs={breadcrumbs}
            is_has_shop={shop?.is_has_shop}
            create_shop={shop?.shop_link}
            currency={currency}
            username={username}
            balance={balance}
            shop={shop}
            role={role}

            idOrder={idOrder}
            status={status}
            weight={weight}
            services={services}
            discount={discount}
            in_archive={in_archive}
            total_cost={total_cost}
            updated_at={updated_at}
            order_cost={order_cost}
            created_at={created_at}
            track_number={track_number}
            delivery_cost={delivery_cost}
            specification={specification}
            dataOrderItems={dataOrderItems}
            payment_method={payment_method}
            order_items_chat={order_items_chat}
            order_chat={order_chat}
            delivery_method={delivery_method}
            fullNumberOrder={fullNumberOrder}
            delivery_address={delivery_address}
            deleteElementOrder={deleteElementOrder}
        />
    )
}

export default OrderDetailsPersonalPage;