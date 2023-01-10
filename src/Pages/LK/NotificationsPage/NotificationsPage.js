import React from 'react';
import NotificationsPageLayoutContainer from './NotificationsPageLayout/NotificationsPageLayoutContainer';

const NotificationsPage = ({
    context
}) => {

    const {
        cabinet_site_menu,
        notifications,
        cabinet_menu,
        breadcrumbs,
        isLoading,
        currency,
        profile,
        shop,
    } = context;
    const { user = {}, role, balance } = profile;

    const amountNotifications = profile?.notifications
    const { username } = user;
    const stateActiveCheckNotice = false;

    return (
        <NotificationsPageLayoutContainer
            amountNotifications={amountNotifications}
            cabinet_site_menu={cabinet_site_menu}
            isLoadingAction={isLoading?.isLoadingActionNotice}
            notifications={notifications}
            cabinet_menu={cabinet_menu}
            breadcrumbs={breadcrumbs}
            create_shop={shop?.shop_link}
            is_has_shop={shop?.is_has_shop}
            currency={currency}
            username={username}
            balance={balance}
            isLoading={isLoading?.isLoadingNotice}
            shop={shop}
            role={role}

            stateActiveCheckNotice={stateActiveCheckNotice}
        />
    )
}

export default NotificationsPage;