import React from 'react';
import { useStoreon } from 'storeon/react';
import NotificationsPageLayout from './NotificationsPageLayout';

const NotificationsPageLayoutContainer = ({
    amountNotifications,
    cabinet_site_menu,
    isLoadingAction,
    notifications,
    cabinet_menu,
    breadcrumbs,
    create_shop,
    is_has_shop,
    isLoading,
    currency,
    username,
    balance,
    shop,
    role,

    stateActiveCheckNotice,
}) => {
    const { dispatch, notificationTest } = useStoreon('notificationTest');

    console.log({notificationTest})

    const heandlerReedNotic = () => {
        dispatch('reedItemsNotice')
    }
    const heandlerDelNotic = () => {
        dispatch('deleteItemsNotice')
    }
    const heandlerCheckAllNotice = (idItem) => {

        const params = {
            idItems: +idItem
        }
        dispatch('checkedAllItemsNotice', params)
    }

    const heandlerCheckNotice = (idItem) => {

        const params = {
            idItem: +idItem
        }
        dispatch('checkedItemsNotice', params)
    }

    const changePaginations = (page) => {
        //?! меняем страницы уведомлений
        const params = {
            page: page
        }
        dispatch('getNotice', params)
    }

    return (
        <NotificationsPageLayout
            amountNotifications={notificationTest?.count}
            isSelectAllItems={notificationTest.isSelectAllItems}
            cabinet_site_menu={cabinet_site_menu}
            isLoadingAction={isLoadingAction}
            notifications={notificationTest}
            cabinet_menu={cabinet_menu}
            breadcrumbs={breadcrumbs}
            create_shop={create_shop}
            is_has_shop={is_has_shop}
            isLoading={isLoading}
            currency={currency}
            username={username}
            balance={balance}
            shop={shop}
            role={role}

            heandlerReedNotic={heandlerReedNotic}
            heandlerDelNotic={heandlerDelNotic}
            heandlerCheckAllNotice={heandlerCheckAllNotice}
            heandlerCheckNotice={heandlerCheckNotice}
            stateActiveCheckNotice={notificationTest.isSelectAllItems}
            changePaginations={changePaginations}
        />
    )
}

export default NotificationsPageLayoutContainer;